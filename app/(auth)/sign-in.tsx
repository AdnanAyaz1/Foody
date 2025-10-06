import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { useForm } from "react-hook-form";
import { Alert, Text, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { ROUTES } from "@/constants";
import { signInSchema, SignInSchema } from "@/libs/schemas/signInSchema";
import useAuthStore from "@/store/auth.store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = () => {
  const { setIsAuthenticated, setUser } = useAuthStore();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInSchema) => {
    try {
      const res = await fetch(`/api/auth/sign_in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const resJson = await res.json();
      if (resJson.success) {
        reset();
        setIsAuthenticated(true);
        await AsyncStorage.setItem("token", resJson.jwtToken);
        const user = resJson.data.user;
        setUser({
          name: user.name as string,
          email: user.email as string,
          avatar: user.image as string,
        });
        router.replace(ROUTES.home);
      } else {
        throw new Error(resJson.error?.message || "Sign In failed");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to sign in.");
    }
  };

  return (
    <View className="gap-6 p-5 mt-5">
      {/* Controlled inputs */}
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

      {/* Submit button */}
      <CustomButton
        title="Sign In"
        disabled={isSubmitting}
        isLoading={isSubmitting}
        onPress={handleSubmit(onSubmit)}
      />

      {/* Footer link */}
      <View className="flex flex-row justify-center gap-2 mt-5">
        <Text className="text-gray-100 base-regular">
          Don’t have an account?
        </Text>
        <Link href="/sign-up" className="base-bold text-primary">
          Sign Up
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
