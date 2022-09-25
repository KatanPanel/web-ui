import { basicSetup } from "codemirror";
import VueCodeMirror from "vue-codemirror";
import { App } from "vue";

const install = (app: App) => {
	app.use(VueCodeMirror, {
		autoFocus: true,
		indentWithTab: true,
		tabSize: 4,
		extensions: [basicSetup]
	})
}

export default install
