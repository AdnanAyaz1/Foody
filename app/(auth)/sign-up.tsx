// app/(auth)/sign-up.tsx
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import { useForm } from "react-hook-form";
import { Alert, Text, View } from "react-native";

import { signUpSchema, SignUpSchema } from "@/libs/schemas/signUpSchema";
import useAuthStore from "@/store/auth.store";

const SignUp = () => {
  const { setUser, setIsAuthenticated } = useAuthStore();
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { isSubmitting, isValid },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (data: SignUpSchema) => {
    const password = getValues("password");

    const isValidPassword =
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password);

    if (!isValidPassword) return;

    try {
      const res = await fetch(`/api/auth/sign_up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resJson = await res.json();

      if (!res.ok) throw new Error(resJson.error?.message || "Signup failed");
      Alert.alert("Success", "Account created successfully!");
      reset();
      const user = resJson.data.user;
      setUser({
        name: user.name as string,
        email: user.email as string,
        avatar: user.image as string,
      });

      setIsAuthenticated(true);

      await AsyncStorage.setItem("token", resJson.jwtToken);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View className="gap-6 p-5 mt-5 bg-white rounded-lg">
      <CustomInput
        control={control}
        name="name"
        label="Full Name"
        placeholder="Enter your full name"
      />
      <CustomInput
        control={control}
        name="email"
        label="Email"
        placeholder="Enter your email"
        keyboardType="email-address"
      />
      <CustomInput
        control={control}
        name="password"
        label="Password"
        placeholder="Enter your password"
        secureTextEntry
      />

      <CustomButton
        title="Sign Up"
        disabled={!isValid}
        isLoading={isSubmitting}
        onPress={handleSubmit(onSubmit)}
      />

      <View className="flex flex-row justify-center gap-2 mt-5">
        <Text className="text-gray-100 base-regular">
          Already have an account?
        </Text>
        <Link href="/sign-in" className="base-bold text-primary">
          Sign In
        </Link>
      </View>
    </View>
  );
};

export default SignUp;
