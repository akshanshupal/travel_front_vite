import { AuthLayout } from "@/layouts/AuthLayout";
import { useStoreLogin } from "@/store/login";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import { useState } from "react";
import { useNavigate } from "react-router";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function LoginPage() {
    const navigate = useNavigate();
    const login = useStoreLogin((s) => s.login);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");
        try {
            await login({ username: email, password });
            navigate("/dashboard");
        } catch (error: any) {
            setErrorMsg(error?.error?.message || error?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                {errorMsg && (
                    <div className="rounded-lg bg-error-50 p-3 text-sm text-error-600 dark:bg-error-500/10 dark:text-error-500">
                        {errorMsg}
                    </div>
                )}
                <Input
                    value={email}
                    onChange={setEmail}
                    label="Email"
                    placeholder="you@example.com"
                    type="text"
                />
                <div className="relative">
                    <Input
                        value={password}
                        onChange={setPassword}
                        label="Password"
                        placeholder="Enter password"
                        type={showPassword ? "text" : "password"}
                        inputClassName="pr-10"
                    />
                    <button
                        type="button"
                        className="absolute bottom-[9px] right-3 text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                </div>
                <Button type="submit" disabled={loading} className="mt-2 w-full">
                    {loading ? "Signing in..." : "Sign in"}
                </Button>
            </form>
        </AuthLayout>
    );
}
