import { useEffect, useState } from "react";
import { FillInfoContainer, IntroContainer } from "./styles";
import { EntrepreneurInfo } from "./EntrepreneurInfo";
import { InvestorInfo } from "./InvestorInfo";
import { PoweredBy } from "components/PoweredBy/PoweredBy";
import { api } from "services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const FillInformation = () => {
    const [step, setStep] = useState(1);
    const [userType, setUserType] = useState<number|null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleUserType = (userType: number) => {
        setUserType(userType);
        setStep(1);
    };

    const handleSubmit = async (data: any) => {
        setLoading(true);
        // format data
        data['userTypeId'] = userType;
        delete data['has_accepted_terms'];
        delete data['has_accepted_terms2'];
        delete data['represent_fund'];
        // send data
        await api.post('/fill-information', data).catch((err) => {
            console.error(err);
            toast.error('Erro ao enviar dados');
        });
        navigate('/home', { replace: true });
        setLoading(false);
    };

    const handleGoBack = () => {
        setStep(1);
    };

    useEffect(() => {
        if (step === 1 && !userType) {
            setTimeout(() => {
                setStep(2);
            }, 2000);
        }
        else if (step === 1 && userType) {
            document.getElementById('1')?.scrollIntoView({ behavior: 'smooth' });
        }
        else if (step === 2) {
            document.getElementById('2')?.scrollIntoView({ behavior: 'smooth' });
        }
        else if (step === 3) {
            document.getElementById('3')?.scrollIntoView({ behavior: 'smooth' });
        }
        else if (step === 4) {
            document.getElementById('4')?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [step, userType]);
    
    return !userType ? (
        <IntroContainer step={step}>
            <div className="step-1" id="1">
                <img src="imgs/intro.png" alt="Dunnit Intro" />
            </div>
            <div className="step-2" id="2">
                <span className="subtitle">Bem vindx a</span>
                <span className="title">LET'S DUNIT</span>
                <i className="ph ph-caret-right" onClick={() => setStep(3)} />
            </div>
            <div className="step-3" id="3">
                <img src="imgs/dunit.png" alt="" />
                <div className="investimento">
                    <span>Para ajudar quem quer</span>
                    <span>investimento</span>
                </div>
                <div className="investir">
                    <span>ou para quem quer</span>
                    <span>investir</span>
                </div>
                <i className="ph ph-caret-right" onClick={() => setStep(4)} />
            </div>
            <div className="step-4" id="4">
                <img className="logo" src="imgs/dunit.png" alt="" />
                <span className="title">Mas vamos lá!</span>
                <span className="subtitle">Você é:</span>
                <button onClick={() => handleUserType(2)}>
                    Empreendedor
                </button>
                <button onClick={() => handleUserType(1)}>
                    Investidor
                </button>
                <PoweredBy />
            </div>
        </IntroContainer>
    ) : (
        <FillInfoContainer>
            <div className="step-1" id="1">
                <img src="imgs/dunit.png" alt="" />
                <span className="title">
                    {userType === 1 ? 'Investidor ✏' : 'StartUp ✨'}
                </span>
                <span className="subtitle">
                    {userType === 1 ? 'Legal! Vamos te ajudar nesse fit para aporte!' : 'Legal!'}
                </span>
                <span className="description">
                    Agora precisamos de algumas informações da sua empresa!
                </span>
                <span className="call">
                    Vamos lá?
                </span>
                <i
                    className="ph ph-caret-left"
                    onClick={() => {
                        setUserType(null);
                        setStep(4);
                    }}
                />
                <i
                    className="ph ph-caret-right"
                    onClick={() => {
                        setStep(2);
                    }}
                />
            </div>
            <div className="step-2" id="2">
                <img className="logo" src="imgs/dunit.png" alt="" />
                {step === 2 && <>
                    {userType === 2 ? (
                        <EntrepreneurInfo loading={loading} onSubmit={handleSubmit} goBack={handleGoBack} />
                    ) : (
                        <InvestorInfo loading={loading} onSubmit={handleSubmit} goBack={handleGoBack} />
                    )}
                </>}
            </div>
        </FillInfoContainer>
    );
}