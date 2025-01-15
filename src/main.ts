type Card = [string, string]

let $ = <T extends Element>(selector: string) =>
  document.querySelector<T>(selector)
let reload = () => location.reload()

let database: Card[][] = JSON.parse(localStorage.getItem("d") || "[[],[],[]]")
let currentCard = () => database[box][0]
let saveDatabase = () => localStorage.setItem("d", JSON.stringify(database))

let box = 0

/**
 * Render the first card in the current box
 * @returns `undefined` if the card **was** shown without any errors, or `0` if the card doesn't exist
 */
let renderCard = () => {
  $("h2").textContent = `Box ${box + 1} (${database[box].length} cards)`
  currentCard()
    ? ($("p").textContent = currentCard()[0])
    : ($("p").textContent = "Empty box")
}

// @ts-ignore `b` for "box dropdown changed"
self.b = () => {
  // @ts-ignore
  box = $<HTMLSelectElement>("select").value - 1
  // If there are cards in the box, show the first one
  // -1 so that when we first call showCard, it'll increment snowCard and show the first card
  renderCard()
}

// We show the first card in the box that happens to be selected on page load (which is normally box 1, unless the browser is filling it from a previous page load)
// @ts-ignore
self.b()

// @ts-ignore `p` for "plus button callback"
self.p = () => {
  // Callback for when the "+" (add card) button is clicked
  let question = $<HTMLTextAreaElement>("#q").value
  let answer = $<HTMLTextAreaElement>("#a").value
  database[0].push([question, answer])
  saveDatabase()
  reload()
}

// @ts-ignore `s` for "show answer"
self.s = () =>
  // Callback for when the book emoji (show answer) button is clicked
  ($("p").textContent = currentCard()[1])

// @ts-ignore `n` for "next card"
self.n = (offset: number) => {
  // Callback for the red X and checkmark buttons
  // If offset is 0, move the card all the way down. If offset is 1, move the card to the next box
  // If card is in the last box (index 2), keep it in there
  let newBox = Math.min((box + offset) * offset, 2)
  currentCard() && database[newBox].push(currentCard())
  database[box].shift()
  saveDatabase()
  renderCard()
  if (!database[box].length) {
    confirm("End of box. Restart?") && reload()
  }
}
