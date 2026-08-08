import { toast } from "react-toastify";

const configuracao = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
};

const notificacoes = {

    sucesso(mensagem) {
        toast.success(mensagem, configuracao);
    },

    erro(mensagem) {
        toast.error(mensagem, configuracao);
    },

    aviso(mensagem) {
        toast.warning(mensagem, configuracao);
    },

    info(mensagem) {
        toast.info(mensagem, configuracao);
    },
};

export default notificacoes;