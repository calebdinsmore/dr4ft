import cockatrice from "./cockatrice";
import mtgo from "./mtgo";
import mtga from "./mtga";
import text from "./text";
import magicord from "./magicord";
import tts from "./tts";

const toJSON = (filename, deck) => JSON.stringify(deck, null, 2);
const json = {
  name: "JSON",
  download: toJSON,
  downloadExtension: ".json",
  copy: toJSON,
};

export default {
  cockatrice,
  mtga,
  mtgo,
  text,
  json,
  magicord,
  tts,
};
