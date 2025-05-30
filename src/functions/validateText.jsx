export function makeTextSafe(text) {
  switch(true) {
    case text.includes("&"):
      alert("You just typed an invalid '&' character. This character is not included in your input");
      return false;
    case text.includes("!"):
      alert("You just typed an invalid '!' character");
      return false;
    case text.includes("?"):
      alert("You just typed an invalid '?' character");
      return false;
    case text.includes("("):
      alert("You just typed an invalid '(' character");
      return false;
    case text.includes(")"):
      alert("You just typed an invalid ')' character");
      return false;
    case text.includes("<"):
      alert("You just typed an invalid '<' character");
      return false;
    case text.includes(">"):
      alert("You just typed an invalid '>' character");
      return false;
    case text.includes("\""):
      alert("You just typed invalid double quotes");
      return false;
    case text.includes("@"):
      alert("You just typed an invalid @ character");
      return false;
    case text.includes("#"):
      alert("You just typed an invalid # character");
      return false;
    case text.includes("%"):
      alert("You just typed an invalid % character");
      return false;
    case text.includes("*"):
      alert("You just typed an invalid * character");
      return false;
    case text.includes("/"):
      alert("You just typed an invalid / character");
      return false;
    case text.includes(","):
      alert("You just typed an invalid , character");
      return false;
    case text.includes("."):
      alert("You just typed an invalid . character");
      return false;
    case text.includes("["):
      alert("You just typed an invalid . character");
      return false;
    case text.includes("]"):
      alert("You just typed an invalid * character");
      return false;
    case text.includes("{"):
      alert("You just typed an invalid { character");
      return false;
    case text.includes("}"):
      alert("You just typed an invalid } character");
      return false;
    case text.includes("+"):
      alert("You just typed an invalid + character");
      return false;
    case text.includes("="):
      alert("You just typed an invalid = character");
      return false;
    case text.includes("$"):
      alert("You just typed an invalid $ character");
      return false;
    case text.includes(":"):
      alert("You just typed an invalid : character");
      return false;
    case text.includes(";"):
      alert("You just typed an invalid ; character");
      return false;
    default:
      return true;
  };
}