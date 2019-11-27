/**
 * email.js
 * @author rmchen
 * @version 1.0
 * Created: 18-06-25
 */

import {
    isEmail
} from "../../utils/utils";
import Dialog from "../ui/dialog/dialog";

/**
 * 单个邮箱dom检测的模块
 * @see 因为这段代码有点长，放在common里面影响阅读，而且也算是一个小需求，
 * 我就提出来了,在html里给input定义一个id="postEmail"执行下这个函数就行了
 */
export default () => {
    $("#postEmail")[0].addEventListener("keyup", function (e) {
        let email = e.target.value,
            type = null;

        $('.dingyue').on('click', function () {
            isEmail(email) ? isEmailThen() : notEmailThen();
        })

        if (e.keyCode === 13) {
            isEmail(email) ? isEmailThen() : notEmailThen();
        }

        //符合格式
        function isEmailThen() {
            api
                .postEmail({
                    txtName: "邮箱",
                    txtEmail: email
                })
                .then(res => {
                    !!res.status ?
                        (type = {
                            alert: "已发送",
                            type: "success"
                        }) :
                        (type = {
                            alert: "发送失败，请稍后重试",
                            type: "warning"
                        });
                    showDialog(type);
                });
        }

        //不符合格式
        function notEmailThen() {
            type = {
                alert: "请输入正确的邮箱格式",
                type: "warning"
            };
            showDialog(type);
        }

        //dialog弹出框
        function showDialog(type) {
            const dialog = new Dialog().alert(type.alert, {
                type: type.type
            });
            e.target.value = "";
        }
    });
};