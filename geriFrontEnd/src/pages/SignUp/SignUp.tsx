import { FieldValues, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./validation";
import { Navigate, useNavigate } from "react-router-dom";
import { isUserAuthenticated } from "../../utils/auth";
import { Button, Form, Typography, Alert, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import styles from "./SignUp.module.css";
import useSignUp from "../../hooks/useSingUp";
import { UserSignUp } from "../../types/userSignUp";

export const SignUp = () => {
  const navigate = useNavigate();
  const { mutate, error } = useSignUp();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignUp>({ resolver: zodResolver(schema) });

  const onSubmit = async (form: FieldValues) => {
    mutate({
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword,
      name: form.name,
    });
  };

  if (isUserAuthenticated()) {
    return <Navigate to="/dashaboard" />;
  }

  return (
    <div className={styles.signInContainer}>
      <Button
        type="link"
        className={styles.goBackButton}
        onClick={() => navigate("/signin")}
      >
        Sign In
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
          Create an account
        </Typography.Title>
        <div className={styles.forms}>
          <Form.Item
            validateStatus={errors.name ? "error" : ""}
            help={errors.name?.message}
          >
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  style={{ marginBottom: "10px" }}
                  {...field}
                  prefix={<MailOutlined />}
                  placeholder="Name"
                />
              )}
            />
          </Form.Item>
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
          <Form.Item
            validateStatus={errors.confirmPassword ? "error" : ""}
            help={errors.confirmPassword?.message}
          >
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input.Password
                  {...field}
                  prefix={<LockOutlined />}
                  placeholder="Confirm Password"
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
          Sign Up
        </Button>
        {error && (
          <Alert
            message="An error happened"
            type="error"
            className={styles.errorMessage}
          />
        )}
      </Form>
    </div>
  );
};
