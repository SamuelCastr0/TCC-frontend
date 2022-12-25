type Sentences = Array<string>;

class TypeWriter {
  sentences: Sentences;
  sentencesIndex = 0;
  letterIndex = 0;
  isWriting = false;
  interval: NodeJS.Timer | undefined;

  constructor(sentences: Sentences) {
    this.sentences = sentences;
  }

  get sentence() {
    return this.sentences[this.sentencesIndex];
  }
  get letter() {
    return this.sentence[this.letterIndex];
  }
  increaseSentence() {
    this.sentencesIndex += 1;
    this.letterIndex = 0;
    if (!this.sentence) {
      this.sentencesIndex = 0;
      this.letterIndex = 0;
    }
  }
  increaseLetter() {
    this.letterIndex += 1;
  }
  start(element: Element) {
    this.isWriting = true;
    this.interval = setInterval(() => {
      if (this.letter) {
        element.innerHTML += this.letter;
        this.increaseLetter();
      } else if (this.isWriting) {
        this.isWriting = false;
        setTimeout(() => {
          element.innerHTML = "";
          this.increaseSentence();
          this.isWriting = true;
        }, 1000);
      }
    }, 200);
  }
  stop() {
    clearInterval(this.interval);
  }
}

export default TypeWriter;
