import { AuthLayout } from "@/layouts/AuthLayout";
import { useStoreLogin } from "@/store/login";
import { useStoreCompany } from "@/store/company";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import { useState } from "react";
import { useNavigate } from "react-router";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { getCompanyConfig } from "@/utils/services/userService";
import { authService } from "@/utils/services/authService";

export default function LoginPage() {
    const navigate = useNavigate();
    const login = useStoreLogin((s) => s.login);
    const loginWithOtp = useStoreLogin((s) => s.loginWithOtp);
    const setCompany = useStoreCompany((s) => s.setCompany);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [useOtp, setUseOtp] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");
        try {
            if (useOtp && !otpSent) {
                await authService.requestOtp(email);
                setOtpSent(true);
                return;
            }
            if (useOtp) {
                await loginWithOtp(email, otp);
            } else {
                await login({ username: email, password });
            }
            try {
                const host = typeof window !== "undefined" ? window.location.hostname : "";
                if (host) {
                    debugger
                    const res = await getCompanyConfig({ websiteUrls: host, populate: "company" });
                    const resolved = (res as any)?.data ?? res;
                    const company = Array.isArray(resolved) ? (resolved[0] ?? null) : resolved;
                    setCompany(company || null);
                } else {
                    setCompany(null);
                }
            } catch {
                setCompany(null);
            }
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
                    type="email"
                />
                {useOtp ? (
                    otpSent ? (
                        <Input
                            value={otp}
                            onChange={setOtp}
                            label="Verification code"
                            placeholder="Enter 6-digit OTP"
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                        />
                    ) : null
                ) : (
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
                )}
                <Button type="submit" disabled={loading} className="mt-2 w-full">
                    {loading ? (useOtp && !otpSent ? "Sending code..." : "Signing in...") : (useOtp && !otpSent ? "Send OTP" : "Sign in")}
                </Button>
                <button
                    type="button"
                    className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
                    onClick={() => { setUseOtp(!useOtp); setOtpSent(false); setOtp(""); setErrorMsg(""); }}
                >
                    {useOtp ? "Sign in with password" : "Sign in with email OTP"}
                </button>
            </form>
        </AuthLayout>
    );
}
