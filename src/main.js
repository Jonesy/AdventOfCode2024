class AocDay extends HTMLElement {
  constructor() {
    super();
    this.writeAnswer = this.writeAnswer.bind(this);
  }

  connectedCallback() {
    this.details = this.querySelector("details");
    this.details?.addEventListener("toggle", this);
  }

  handleEvent(event) {
    if (event.target.open) {
      this.loadSolution();
    }
  }

  loadSolution() {
    const date = this.getAttribute("date");
    const path = `/days/${date}/day-${date}.js`;
    import(path).then((mod) => mod.run(date, this.writeAnswer));
  }

  writeAnswer(target, number, value) {
    const input = this.querySelector(`input.aoc-${target}-${number}`);
    input.value = value;
    input.dispatchEvent(new Event("change"));
  }
}

customElements.define("aoc-day", AocDay);

export default function main() {
  const today = new Date();
  const mainEl = document.querySelector("main");
  const template = document.getElementById("day-template");
  const data = JSON.parse(document.getElementById("data").text);

  data.reverse().forEach((day, index) => {
    const date = index + 1;
    const dayEl = document.createElement("aoc-day");
    dayEl.setAttribute("date", date);
    dayEl.appendChild(template.content);
    dayEl.querySelector("summary").textContent = `Day ${date}`;
    dayEl.querySelector("input.aoc-test-1").setAttribute("pattern", day.test1);
    dayEl.querySelector("input.aoc-test-2").setAttribute("pattern", day.test2);

    if (date === today.getDate() || data.length === 1) {
      dayEl.querySelector("details")?.setAttribute("open", "");
    }

    mainEl.appendChild(dayEl);
  });
}
