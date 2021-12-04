import { Form, Icon, Input, Button } from "antd";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import { useAuth } from "../../route";
import { openNotification } from "../../componets";
function LoginPage(props) {
  const { form } = props;
  const { validateFields, getFieldDecorator } = form;
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();

  const { from } = location.state || { from: { pathname: "/" } };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, result) => {
      if (!err) {
        auth.signin(() => {
          history.replace(from);
        });
        openNotification({
          type: "success",
          message: "Sukses",
          description: "Berhasil Login",
        });
      } else {
        openNotification({
          type: "error",
          message: "Gagal",
          description: "Gagal Login Coba kembali !!",
        });
      }
    });
  };
  return (
    <Container>
      <Row>
        <Col>
          <Form
            layout="horizontal"
            onSubmit={handleSubmit}
            style={{ width: "50%", height: "100vh" }}
            className="login-form mx-auto"
          >
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  { required: true, message: "Please input your username!" },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your password" },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
const wrapperForm = Form.create()(LoginPage);
export default wrapperForm;
