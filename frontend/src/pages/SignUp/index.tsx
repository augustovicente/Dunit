import { useState } from "react";
import { SignupContainer } from "./styles";
import { useAuth } from "contexts/auth.context";

export const SignUp = () => {
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [seePwd, setSeePwd] = useState(false);
    const { signIn } = useAuth();
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        event.preventDefault();
        const response = await signIn({
            email: username,
            password
        });
        setLoading(false);
        
        if (!response)
        {
            setError(true);
            return;
        }
    };

    return (
        <SignupContainer>
            <img src="imgs/dunit.png" alt="" />
            <div className="login-content">
                <div className="intro">
                    <span className="intro-title">Crie sua conta</span>
                    <span className="intro-subtitle">Conecte com empresa e investidores hoje!</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={`form-group ${error ? 'error': ''}`}>
                        <label htmlFor="username">E-mail</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className={`form-group ${error ? 'error': ''}`}>
                        <label htmlFor="phone">Telefone</label>
                        <div className="form-control">
                            <span>+55</span>
                            <input
                                type="number"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={`form-group ${error ? 'error': ''}`}>
                        <label htmlFor="password">Senha</label>
                        <div className="pwd-content">
                            <input
                                type={seePwd ? 'text' : 'password'}
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {seePwd ? (
                                <i className="ph ph-eye-slash" onClick={() => setSeePwd(false)}></i>
                            ) : (
                                <i className="ph ph-eye" onClick={() => setSeePwd(true)}></i>
                            )}
                        </div>
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                Senha ou email incorretos.
                            </div>
                        )}
                    </div>
                    <button type="submit" className="btn">
                        Cadastrar
                        {loading && (
                            <img src="imgs/spinner.webp" />)}
                    </button>
                    <div className="login">
                        <span>Já tem uma conta?</span>
                        <a href="login">Login</a>
                    </div>
                </form>
            </div>
        </SignupContainer>
    );
}