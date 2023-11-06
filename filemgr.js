const fs = require("fs/promises")

async function ReadData() {
  try {
     // Make sure the file exists
    // Read the file
    // convert the buffer to a json object and return it
    const path = "./data.json";
    let jsonData = await fs.readFile(path);
    let data = JSON.parse(jsonData.toString());
    return data;
  } catch (error) {
    console.error(`Error when reading data: ${error}`);
    return -1;
  }
}

async function WriteData(dataOut) {
  try {
    // Write the file
    await fs.writeFile('data.json', JSON.stringify(dataOut));
    console.log('Data written to file');
    return true;
  } catch (error) {
    console.error(`Error when reading data: ${error}`);
    return false;
  }
}

exports.ReadData = ReadData;
exports.WriteData = WriteData;
