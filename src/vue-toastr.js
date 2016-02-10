import template from './vue-toastr.html'
import toast from './toast/toast.js'
export default {
    template: template,
    name: "vueToastr",
    data() {
        return {
            positions: ['toast-top-right', 'toast-bottom-right', 'toast-bottom-left', 'toast-top-left', 'toast-top-full-width', 'toast-bottom-full-width', 'toast-top-center', 'toast-bottom-center'],
            defaultPosition: 'toast-top-right',
            defaultType: 'success',
            defaultTimeout: 5000,
            list: {},
        }
    },
    created() {
        // console.log("Created");
        for (var i = 0; i <= this.positions.length - 1; i++) {
            this.list[this.positions[i]] = [];
        }
    },
    ready() {
        // console.log("ready", this.list);
    },
    components: {
        'toast': toast,
    },
    methods: {
        addToast(data) {
            this.list[data.position].push(data);
            // if have onCreated
            if (typeof data.onCreated != "undefined") {
                // wait doom update after call cb
                this.$nextTick(() => {
                    data.onCreated();
                });
            }
        },
        removeToast(data) {
            // if have onClosed
            if (typeof data.onClosed != "undefined") {
                data.onClosed();
            }
            this.list[data.position].$remove(data);
        },
        Add(d) {
            return this.AddData(this.processObjectData(d));
        },
        AddData(data) {
            if (typeof data !== "object") {
                console.log("AddData accept only Object");
                return false;
            }
            this.addToast(data);
            return data;
        },
        processObjectData(data) {
            // if Object
            if (typeof data == "object" && typeof data.msg != "undefined") {
                if (typeof data.position == "undefined") {
                    data.position = this.defaultPosition;
                }
                if (typeof data.type == "undefined") {
                    data.type = this.defaultType;
                }
                if (typeof data.timeout == "undefined") {
                    data.timeout = this.defaultTimeout;
                }
                return data;
            }
            // if String
            return {
                msg: data.toString(),
                position: this.defaultPosition,
                type: this.defaultType,
                timeout: this.defaultTimeout
            }
        },
        e(msg, title) {
            var data = this.processObjectData(msg);
            data['type'] = 'error';
            if (typeof title != "undefined") {
                data['title'] = title;
            }
            return this.AddData(data);
        },
        s(msg, title) {
            var data = this.processObjectData(msg);
            data['type'] = 'success';
            if (typeof title != "undefined") {
                data['title'] = title;
            }
            return this.AddData(data);
        },
        w(msg, title) {
            var data = this.processObjectData(msg);
            data['type'] = 'warning';
            if (typeof title != "undefined") {
                data['title'] = title;
            }
            return this.AddData(data);
        },
        i(msg, title) {
            var data = this.processObjectData(msg);
            data['type'] = 'info';
            if (typeof title != "undefined") {
                data['title'] = title;
            }
            return this.AddData(data);
        },
        Close(data) {
            //console.log(data);
            this.removeToast(data);
        }
    }
}