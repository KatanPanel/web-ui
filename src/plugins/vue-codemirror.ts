import { App } from "vue";
import VueCodeMirror from "vue-codemirror";
import { basicSetup } from "codemirror";
import { json, jsonParseLinter } from "@codemirror/lang-json";
import { xml } from "@codemirror/lang-xml";
import { markdown } from "@codemirror/lang-markdown";
import { linter, lintGutter } from "@codemirror/lint";
import { hyperLink } from "@uiw/codemirror-extensions-hyper-link";
import { color } from "@uiw/codemirror-extensions-color";

const install = (app: App) => {
	app.use(VueCodeMirror, {
		autoFocus: true,
		indentWithTab: true,
		tabSize: 4,
		extensions: [
			basicSetup,
			json(),
			xml(),
			markdown(),
			linter(jsonParseLinter()),
			lintGutter(),
			hyperLink,
			color
		]
	})
}

export default install
