import { FieldValues, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./validation";
import { Navigate, useNavigate } from "react-router-dom";
import { isUserAuthenticated } from "../../utils/auth";
import { Button, Input, Form, Typography, Alert } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import styles from "./SignIn.module.css";
import { UserAuthentication } from "../../types/userAuthentication";
import useSignIn from "../../hooks/useSingIn";

const SignIn = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAuthentication>({ resolver: zodResolver(schema) });

  const { mutate, error } = useSignIn();
  const onSubmit = async (form: FieldValues) => {
    mutate({ email: form.email, password: form.password });
  };

  if (isUserAuthenticated()) {
    return <Navigate to="/dashaboard" />;
  }

  return (
    <div className={styles.signInContainer}>
      <Button
        type="link"
        className={styles.goBackButton}
        onClick={() => navigate("/signup")}
      >
        Sign Up
      </Button>
      <Form
        name="signin"
        labelCol={{ span: 80 }}
        wrapperCol={{ span: 100 }}
        onFinish={handleSubmit(onSubmit)}
        autoComplete="off"
        className={styles.formContainer}
      >
        <Typography.Title level={3} className={styles.title}>
          Welcome Back
        </Typography.Title>
        <div className={styles.forms}>
          <Form.Item
            validateStatus={errors.email ? "error" : ""}
            help={errors.email?.message}
          >
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  style={{ marginBottom: "10px" }}
                  {...field}
                  prefix={<MailOutlined />}
                  placeholder="Email"
                />
              )}
            />
          </Form.Item>
          <Form.Item
            validateStatus={errors.password ? "error" : ""}
            help={errors.password?.message}
          >
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input.Password
                  {...field}
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              )}
            />
          </Form.Item>
        </div>

        <Button
          type="primary"
          htmlType="submit"
          style={{ borderRadius: "5px" }}
          className={styles.buttonConfirm}
        >
          Sign In
        </Button>
        {error && (
          <Alert
            message="Credentials are not correct"
            type="error"
            className={styles.errorMessage}
          />
        )}
      </Form>
    </div>
  );
};
export default SignIn;
