// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import ipily from 'ipily';
import IP2Region from 'ip2region';
import moment from 'moment';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('helloworld.helloWorld', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const ip = await ipily();
		const query = new IP2Region();
		const ipAddress: {country:string, province:string, city:string} | null = query.search(ip);
		const {country=''} = ipAddress || {};
		vscode.window.showInformationMessage(`当前时间为：${moment().format('YYYY-MM-DD HH:mm:ss')}，当前位置为${country}`);
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
