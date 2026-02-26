-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 26/02/2026 às 01:07
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `controlador_de_caixa`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `lancamentos`
--

CREATE TABLE `lancamentos` (
  `id` int(11) NOT NULL,
  `data` date NOT NULL,
  `tipo` enum('credito','debito') NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `congregacao` varchar(50) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `valor` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `lancamentos`
--

INSERT INTO `lancamentos` (`id`, `data`, `tipo`, `categoria`, `congregacao`, `nome`, `valor`) VALUES
(11, '2026-02-07', 'credito', 'Acerto', 'Jardim Alvorada', 'acerto fevereiro', 615.50),
(12, '2026-02-07', 'credito', 'EBD', 'Jardim Alvorada', '2 parcela', 151.00),
(16, '2026-02-07', 'credito', 'oferta missionaria', 'Jardim Alvorada', 'PROJETO ORLANDO', 100.00),
(17, '2026-02-07', 'credito', 'oferta missionaria', 'Jardim Alvorada', 'PROJETO CARABANAS', 100.00),
(18, '2026-02-07', 'credito', 'Acerto', 'Itapitangui', 'acerto fevereiro', 870.16),
(19, '2026-02-07', 'credito', 'EBD', 'Itapitangui', '1 parcela', 117.00),
(20, '2026-02-07', 'credito', 'EBD', 'Barra do Ribeirão', '1 e 2 parcela ', 210.00),
(21, '2026-02-07', 'credito', 'Acerto', 'Pariquera', 'acerto fevereiro', 1800.00),
(22, '2026-02-07', 'credito', 'Oferta', 'Sede', 'reunião de obreiros', 103.00),
(23, '2026-02-08', 'credito', 'Dízimo', 'Sede', 'talita sabino', 200.00),
(24, '2026-02-08', 'credito', 'Oferta', 'Sede', 'culto ceia', 54.00),
(25, '2026-02-08', 'credito', 'Dízimo', 'Sede', 'PB CARLOS', 240.00),
(26, '2026-02-08', 'credito', 'Dízimo', 'Sede', 'CINTIA', 430.00),
(27, '2026-02-08', 'credito', 'Dízimo', 'Sede', 'JUDITH DE MACEDO', 300.00),
(28, '2026-02-08', 'credito', 'Dízimo', 'Sede', 'GILBERTO GENEROSO', 100.00),
(29, '2026-02-08', 'credito', 'Dízimo', 'Sede', 'ADMILSON MOREIRA', 700.00),
(30, '2026-02-08', 'credito', 'Dízimo', 'Sede', 'CLEONICE MOREIRA', 470.00),
(31, '2026-02-14', 'credito', 'Anuidade', 'Sede', '1 parcela valdecir', 100.00),
(32, '2026-02-14', 'credito', 'Oferta', 'Sede', 'oferta', 36.00),
(33, '2026-02-14', 'credito', 'Dízimo', 'Sede', 'valdecir e leonice', 500.00),
(34, '2026-02-14', 'credito', 'Dízimo', 'Sede', 'rosa ribeiro', 220.00),
(35, '2026-02-14', 'credito', 'CIBEM', 'Sede', 'cibem', 250.00),
(36, '2026-02-14', 'credito', 'Acerto', 'Serrote', 'acerto janeiro', 1194.60),
(37, '2026-02-18', 'credito', 'Dízimo', 'Jacupiranga', 'simone domingues', 362.05),
(38, '2026-02-18', 'credito', 'Dízimo', 'Jacupiranga', 'Rubens Domingues Filho', 646.50),
(39, '2026-02-07', 'credito', 'Acerto', 'Jacupiranga', 'acerto ref. janeiro - dizimos + 2 parc ebd 20/11', 1336.00),
(40, '2026-02-20', 'credito', 'Dízimo', 'Sede', 'renan wellington da silva', 200.00),
(41, '2026-02-01', 'debito', 'prebenda', 'sede', 'pr ismael', 3500.00),
(42, '2026-02-02', 'debito', 'ajuda de custo', 'sede', 'reembolso', 120.00),
(43, '2026-02-05', 'credito', 'Anuidade', 'Sede', 'ev bruno', 101.25),
(44, '2026-02-05', 'credito', 'Dízimo', 'Sede', 'pr gilberto a campos', 1895.00),
(45, '2026-02-09', 'credito', 'oferta missionaria', 'Itimirim', 'missoes', 100.00),
(46, '2026-02-10', 'credito', 'Anuidade', 'Itimirim', 'pr jurandi e ev dulce', 205.00),
(47, '2026-02-05', 'credito', 'Acerto', 'Itimirim', 'acerto janeiro', 1009.00),
(48, '2026-02-05', 'credito', 'EBD', 'Itimirim', '2 parcela', 234.00),
(49, '2026-02-05', 'debito', 'concessionaria', 'sede', 'elektro', 70.60),
(50, '2026-02-05', 'debito', 'concessionaria', 'sede', 'sabesp', 158.97),
(51, '2026-02-05', 'debito', 'ajuda de custo', 'sede', 'reembolso', 122.46),
(52, '2026-02-05', 'debito', 'imposto', 'sede', 'taxa bancaria', 93.67),
(53, '2026-02-01', 'credito', 'dizimo', 'Sede', 'renan wellington da silva', 800.00),
(54, '2026-02-12', 'credito', 'Acerto', 'Iguape', '20% entradas', 802.00),
(55, '2026-02-12', 'credito', 'Acerto', 'Iguape', '20% entradas', 802.00),
(56, '2026-02-12', 'credito', 'EBD', 'Iguape', '2 parcela', 433.00),
(57, '2026-02-12', 'credito', 'Acerto', 'Iguape', 'dizimos obreiros', 1942.00),
(58, '2026-02-05', 'credito', 'oferta missionaria', 'Iguape', 'Sede mundial', 200.00),
(60, '2026-02-23', 'credito', 'Dízimo', 'Sede', 'maria de loudes', 200.00),
(61, '2026-02-23', 'credito', 'Oferta', 'Sede', 'oferta', 29.00),
(62, '2026-02-10', 'credito', 'Anuidade', 'Sete Barras', 'pr. juvenal', 101.25),
(63, '2026-01-11', 'credito', 'Dízimo', 'Sete Barras', 'pr aparecido', 62.00),
(64, '2026-02-08', 'credito', 'oferta missionaria', 'Sete Barras', 'missoes', 100.00),
(65, '2026-01-12', 'credito', 'Acerto', 'Sete Barras', 'acerto ref. dezembro', 1123.93),
(66, '2026-01-12', 'credito', 'oferta missionaria', 'Morangaba', 'missoes', 100.00),
(67, '2026-02-09', 'credito', 'Acerto', 'Sete Barras', 'acerto janeiro', 1615.68),
(68, '2026-02-23', 'debito', 'ajuda de custo', 'sede', 'aux aluguel pr renan', 975.00),
(69, '2026-02-23', 'debito', 'oferta missionaria', 'sede', 'aux para aquisicao blocos carabanas', 933.00),
(70, '2026-02-23', 'debito', 'concessionaria', 'sede', 'EBD - betel', 2596.74),
(71, '2026-02-20', 'credito', 'EBD', 'Cananeia', '2 PARCELA', 185.00),
(72, '2026-02-20', 'debito', 'concessionaria', 'sede', 'reembolso', 601.00),
(73, '2026-02-20', 'debito', 'imposto', 'sede', 'DARF PR ISMAEL', 3382.04),
(74, '2026-02-20', 'debito', 'prebenda', 'sede', 'PR ISMAEL DE SOUZA ALVES', 2327.96),
(75, '2026-02-20', 'debito', 'Anuidade', 'sede', 'ANUIDADE 1 PARCELA', 3341.25),
(76, '2026-02-20', 'debito', 'despesa bancaria', 'sede', 'TAXAS PIX', 15.94),
(77, '2026-02-19', 'debito', 'concessionaria', 'sede', 'SABESP', 81.24),
(78, '2026-02-19', 'debito', 'concessionaria', 'sede', 'PLANO DE SAUDE ', 6963.81),
(79, '2026-02-02', 'debito', 'prebenda', 'sede', 'PREBENDA ', 3500.00),
(80, '2026-02-02', 'debito', 'concessionaria', 'sede', 'reembolso', 120.00),
(81, '2026-02-05', 'debito', 'despesa bancaria', 'sede', 'TARIFA MENSAL', 93.67),
(82, '2026-02-05', 'debito', 'concessionaria', 'sede', 'reembolso', 122.46),
(83, '2026-02-05', 'debito', 'concessionaria', 'sede', 'SABESP', 158.97),
(84, '2026-02-05', 'debito', 'concessionaria', 'sede', 'ELEKTRO', 70.60),
(85, '2026-02-05', 'credito', 'Anuidade', 'Sede', 'EV BRUNO', 101.25);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `lancamentos`
--
ALTER TABLE `lancamentos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `lancamentos`
--
ALTER TABLE `lancamentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
