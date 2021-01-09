import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

import s from './LoginPage.module.scss'
import { createUser, signWithEmail } from '../../firebase';
import { useDispatch } from 'react-redux';
import { setUid } from '../../redux/actions/actions';
import { useHistory } from 'react-router';

const LoginPage = () => {

    const [NewUser, setNewUser] = useState(false)
    const dispatch = useDispatch();
    const history = useHistory();

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const onFinish = (values: any) => {
        if(NewUser) {
            createUser(values.username, values.password)
            .then((user) => {
                console.log('its alive',user.user?.uid)
                dispatch(setUid(user.user?.uid));
                if(user.user?.uid) {
                    localStorage.setItem('user', user.user?.uid);
                    console.log('last check', localStorage.getItem('user'))
                    history.push('/');
                }
            });
        } else {
            signWithEmail(values.username, values.password)
            .then((user) => {
                console.log('its alive',user.user?.uid)
                dispatch(setUid(user.user?.uid));
                if(user.user?.uid) {
                    localStorage.setItem('user', user.user?.uid);
                    console.log('last check', localStorage.getItem('user'))
                    history.push('/');
                }
            });;
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const renderForm = () => (
        <>
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Войти
                        </Button>
                </Form.Item>
            </Form>


        </>

    );


    if (NewUser) {
        return (
            <div className={s.root}>
                {renderForm()}
            </div>
        )
    }

    return (
        <div className={s.root}>
            {renderForm()}

            <div className={s.isNew}>
                <div>
                    Нет аккаунта?
                </div>
                <Button
                    onClick={() => setNewUser(true)}
                >
                    Зарегистрироваться
                </Button>
            </div>
        </div>
    )

};

export default LoginPage;