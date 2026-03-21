import { AuthLayout } from "@/layouts/AuthLayout";
import { useStoreLogin } from "@/store/login";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function LoginPage() {
    const navigate = useNavigate();
    const login = useStoreLogin((s) => s.login);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login({ username: email, password });
            navigate("/dashboard");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <Input
                    value={email}
                    onChange={setEmail}
                    label="Email"
                    placeholder="you@example.com"
                    type="text"
                />
                <Input
                    value={password}
                    onChange={setPassword}
                    label="Password"
                    placeholder="Enter password"
                    type="password"
                />
                <Button type="submit" disabled={loading}>
                    {loading ? "Signing in..." : "Sign in"}
                </Button>
            </form>
        </AuthLayout>
    );
}
