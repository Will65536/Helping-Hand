import { imageToAlt } from "./validation.js"
import {dirname} from 'path';
import path from "path";

const imagePath = path.join(path.dirname(new URL(import.meta.url).pathname), 'public', 'images', 'run.jpg');
console.log(imagePath)
try
{console.log(imageToAlt(imagePath))}
catch(e)
{
  console.error(e)
}