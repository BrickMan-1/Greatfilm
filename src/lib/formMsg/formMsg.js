/**
 * @ formMsg.js
 * @author rmchen
 * @version 1.0
 * Created: 18-06-25
 */

import Dialog from "../ui/dialog/dialog";
import {
    isCellPhone,
    isEmail
} from "../../utils/utils";

/**
 * 提交表单模块
 * @example 
 * new FormMsg({
      nameDom: "#username",       [绑定用户名]       {必选}
      contentDom: "#msg",         [绑定内容]         {必选}
      btnSubmitDom: "#send",      [绑定提交按钮]      {必选}
      telDom: "#tel",             [绑定手机号]        {可选}
      emailDom: "#email",         [绑定邮箱]          {可选}
      successText:"...",          [提交成功显示文本]    {可选}
      failText:"...",             [提交失败显示文本]    {可选}
      submitCB: function() {      [数据提交成功后的回调] {可选}
        console.log("发送成功！"); 
      })
 * @see [注意] 因为目前碰到的需求都是用户名，内容和提交按钮一直要用的，所以写成了必选项
 * 而手机号和邮箱有时候是邮箱有时候是手机号，有时候都要，所以我配置成了可选，如果哪天需求变了，再改这个类吧
 */

export default class formMsg {
    constructor(options) {
        this.options = Object.assign({
                nameDom: "",
                telDom: "",
                emailDom: "",
                contentDom: "",
                btnSubmitDom: "",
                submitCB: null,
                successText: "提交成功，感谢您的留言！",
                failText: "失败，请稍后再试！"
            },
            options
        );
        this.dialogText = [{
                title: this.options.successText,
                type: "success"
            },
            {
                title: this.options.failText,
                type: "warning"
            },
            {
                title: "不能为空！",
                type: "warning"
            },
            {
                title: "邮箱格式不正确！",
                type: "warning"
            },
            {
                title: "请输入正确的手机号码/座机号码",
                type: "warning"
            }
        ];
        this._init();
    }

    //初始化一些属性
    _init() {
        this.nameBox = $(this.options.nameDom);
        this.contentBox = $(this.options.contentDom);
        this.btnSubmit = $(this.options.btnSubmitDom);
        this._submit();

        if (this.options.emailDom) {
            this.emailBox = $(this.options.emailDom);
            this._testEmail();
        } //如果表单中有email要处理，会自动开启相关功能

        if (this.options.telDom) {
            this.telBox = $(this.options.telDom);
            this._testTel();
        } //如果表单中有手机号码要处理，会自动开启相关功能
    }

    //提交前验证
    _submit() {
        this.btnSubmit.on("click", () => {
            const name = this.nameBox.val().trim(),
                content = this.contentBox.val().trim(),
                hasTel = !!this.options.telDom,
                hasEmail = !!this.options.emailDom;

            let tel, email;
            hasTel ? (tel = this.telBox.val().trim()) : "";
            hasEmail ? (email = this.emailBox.val().trim()) : "";

            if (!name) {
                this._showDialog(2, "姓名");
                return;
            }
            if (hasTel && !tel) {
                this._showDialog(2, "号码");
                return;
            }
            if (hasEmail && !email) {
                this._showDialog(2, "邮箱");
                return;
            }
            if (!content) {
                this._showDialog(2, "留言内容");
                return;
            }

            //请求服务器，根据返回值显示结果
            api
                .postMsg({
                    txtName: name,
                    txtEmail: tel,
                    content: content
                })
                .then(res => {
                    console.log(res);
                    const status = res.status === 1 ? 1 : 0;
                    this._showDialog(status);
                });

            //验证通过后触发的回调函数
            this.options.submitCB && this.options.submitCB();
        });
    }

    //检测手机号码格式
    _testTel() {
        this.telBox.on("blur", e => {
            if (e.target.value && !isCellPhone(e.target.value)) {
                this._showDialog(4);
            }
        });
    }

    //检测邮箱格式
    _testEmail() {
        this.emailBox.on("blur", e => {
            if (e.target.value && !isEmail(e.target.value)) {
                this._showDialog(3);
            }
        });
    }

    //显示dialog弹框
    _showDialog(index, text) {
        const alert = this.dialogText[index];

        let title, type;
        if (text) {
            (title = `${text}${alert.title}`), (type = alert.type);
        } else {
            (title = alert.title), (type = alert.type);
        }

        const dialog = new Dialog().alert(title, {
            type: type
        });
    }
}