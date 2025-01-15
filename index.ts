import readline from "node:readline";
import { SerialPort } from "serialport";

const port = new SerialPort({ path: "COM7", baudRate: 9600, autoOpen: false });

const getUserInput = (rl: readline.Interface) =>
    new Promise((resolve) => {
        rl.question(
            `Paste binary data in HEX format or 'exit' to terminate the program\n`,
            (input) => {
                resolve(input);
            },
        );
    });

const runner = async () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    let input = await getUserInput(rl);

    while (input !== "exit") {
        port.write(input);

        input = await getUserInput(rl);
    }

    rl.close();
};

port.open((error) => {
    if (error) {
        console.log(error);
    }

    runner();
});
