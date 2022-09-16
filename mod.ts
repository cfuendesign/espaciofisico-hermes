import { DOMParser, Element } from "./deps.ts";
import { dayjs } from "./deps.ts";

interface EspacioFisicoScheduleEvent {
	classroom: String;
	name: String;
	date: String;
	startHour: String;
	endHour: String;
}

class EspacioFisicoSchedule {

	#studentId: String = "";
	#plaintext: String = "";
	#html: any = "";
	#objs: (EspacioFisicoScheduleEvent[])|null = null;

	constructor(id: String){
		this.#studentId = id;
	}

	#getScheduleHTML = async (id: String) => {
		let result: any = await fetch('https://artemisa.unbosque.edu.co/serviciosacademicos/EspacioFisico/Interfas/funcionesEspaciosFisicosAsigandosReporte.php', {
			method: 'POST',
	    body: new URLSearchParams({
	        'actionID': 'consultardatos',
	        'Fecha_ini': dayjs().subtract(dayjs().day()-1, "d").format("YYYY-MM-DD"),
	        'Fecha_Fin': dayjs().day(7).format("YYYY-MM-DD"),
	        'Num_Estudiante': `${id}`
			})
		})
			.then(response => response.text())
		this.#plaintext = result;
	}

	#getScheduleHTMLAsDocument = () => {
		let scheduleHTMLDoc = new DOMParser().parseFromString(
			`
			<table>
				<tbody>
				${this.#plaintext}
				</tbody>
			</table>`,
			"text/html",
		)!;
		this.#html = scheduleHTMLDoc;
		//console.log(scheduleHTMLDoc.querySelector("body")?.innerHTML);
	 }

	#getScheduleDocumentAsObjectArray = () => {
		 let scheduleHTMLRows = this.#html;
		 scheduleHTMLRows = scheduleHTMLRows.querySelectorAll("tr");
		 const schedule: EspacioFisicoScheduleEvent[] = [...scheduleHTMLRows].map((row: any) => (
			{ 
				classroom: row.childNodes[3].innerHTML,
				name: row.childNodes[6].innerHTML,
				date: row.childNodes[8].innerHTML,
				startHour: row.childNodes[10].innerHTML,
				endHour: row.childNodes[11].innerHTML
			}
		))
		this.#objs = schedule;
	}

	getScheduleObject = async () => {
		await this.#getScheduleHTML(this.#studentId)
			.then(() => this.#getScheduleHTMLAsDocument())
			.then(() => this.#getScheduleDocumentAsObjectArray());
		return this.#objs;
	}

}

export { EspacioFisicoSchedule, type EspacioFisicoScheduleEvent };
