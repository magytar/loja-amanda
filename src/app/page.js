'use client'

import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, X, Plus, Minus, CreditCard, Lock, Check, Menu, Instagram, MessageCircle, Copy  } from 'lucide-react';
import Image from 'next/image';

import VestidoFloral from "./imgs/VestidoFloral1.jpg"
import VestidoFlora2 from "./imgs/VestidoFloral2.jpg"

import Vestidolongocostaaberta1 from "./imgs/Vestidolongocostaaberta1.jpg"
import Vestidolongocostaaberta2 from "./imgs/Vestidolongocostaaberta2.jpg"

import Calcapantalona1 from "./imgs/Calcapantalona1.jpg"
import Calcapantalona2 from "./imgs/Calcapantalona2.jpg"
import Calcapantalona3 from "./imgs/Calcapantalona3.jpg"
import Calcapantalona4 from "./imgs/Calcapantalona4.jpg"

import Conjuntoelegante from "./imgs/conjuntoelegante.jpg"
import Conjuntoelegante2 from "./imgs/conjuntoelegante2.jpg"

const LojaRoupas = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState({ title: '', message: '', type: 'info' });
  const [cart, setCart] = useState([]);
  const [users, setUsers] = useState([
    { id: 1, name: 'Usuario Demo', email: 'demo@email.com', password: '123456' }
  ]);
const [copied, setCopied] = useState(false)
  // Estados de login - separados
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Estados de registro - separados
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

  // Estados do checkout - separados
  const [checkoutName, setCheckoutName] = useState('');
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [checkoutPhone, setCheckoutPhone] = useState('');
  const [checkoutCpf, setCheckoutCpf] = useState('');
  const [checkoutStreet, setCheckoutStreet] = useState('');
  const [checkoutNumber, setCheckoutNumber] = useState('');
  const [checkoutNeighborhood, setCheckoutNeighborhood] = useState('');
  const [checkoutCity, setCheckoutCity] = useState('');
  const [checkoutState, setCheckoutState] = useState('');
  const [checkoutZip, setCheckoutZip] = useState('');
  const [checkoutComplement, setCheckoutComplement] = useState('');
  const [pixData, setPixData] = useState(null);
  const [isGeneratingPix, setIsGeneratingPix] = useState(false);

  const [base64, setbase64] = useState("")
  const [code, setcode] = useState("")
  const [showpay, setshowpay] = useState(false)

  const copyPixCode = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    showNotification('Copiado!', 'Código PIX copiado para a área de transferência', 'success');
    setTimeout(() => setCopied(false), 2000);
  } catch (err) {
    console.error('Erro ao copiar:', err);
    showNotification('Erro', 'Não foi possível copiar o código', 'error');
  }
};

  const produtos = [
    {
      id: 1,
      nome: "Vestido Floral",
      preco: 38.99,
      imagem: VestidoFloral,
      imagem2: VestidoFlora2,
      tamanhos: ['P', 'M', 'G', 'GG'],
      cores: ['Branco']
    },
    {
      id: 2,
      nome: "Vestido Longo Costa Aberta",
      preco: 42.99,
      imagem: Vestidolongocostaaberta1,
      imagem2: Vestidolongocostaaberta2,
      tamanhos: ['P', 'M', 'G', 'GG'],
      cores: ['Branco', 'Preto', 'Rosa']
    },
    {
      id: 3,
      nome: "Calça Pantalona Alfaiataria",
      preco: 18.99,
      imagem: Calcapantalona1,
      imagem2: Calcapantalona2,
      imagem3: Calcapantalona3,
      imagem4: Calcapantalona4,
      tamanhos: ['P', 'M', 'G', 'GG'],
      cores: ['Baje', 'Preto', 'Vinho', 'Cinza']
    },
    {
      id: 4,
      nome: "Conjunto Elegante Feminino Tomara Que Caia + Calça Pantalona Alfaiataria ",
      preco: 59.99,
      imagem: Conjuntoelegante,
      imagem2: Conjuntoelegante2,
      tamanhos: ['P', 'M', 'G', 'GG'],
      cores: ['Baje']
    },
  ];

  // Função para mostrar mensagens
  const showNotification = (title, message, type = 'info') => {
    setMessageContent({ title, message, type });
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const handleLogin = () => {
    if (!loginEmail || !loginPassword) {
      showNotification('Erro', 'Por favor, preencha todos os campos.', 'error');
      return;
    }

    const user = users.find(u => u.email === loginEmail && u.password === loginPassword);
    if (user) {
      setCurrentUser(user);
      setShowLogin(false);
      setLoginEmail('');
      setLoginPassword('');
      showNotification('Sucesso!', `Bem-vindo(a), ${user.name}!`, 'success');
    } else {
      showNotification('Erro', 'Email ou senha incorretos.', 'error');
    }
  };

  const handleRegister = () => {
    if (!registerName || !registerEmail || !registerPassword || !registerConfirmPassword) {
      showNotification('Erro', 'Por favor, preencha todos os campos.', 'error');
      return;
    }

    if (registerPassword !== registerConfirmPassword) {
      showNotification('Erro', 'As senhas não coincidem.', 'error');
      return;
    }

    if (registerPassword.length < 6) {
      showNotification('Erro', 'A senha deve ter pelo menos 6 caracteres.', 'error');
      return;
    }

    if (users.some(u => u.email === registerEmail)) {
      showNotification('Erro', 'Este email já está cadastrado.', 'error');
      return;
    }

    const newUser = { 
      id: Date.now(), 
      name: registerName, 
      email: registerEmail, 
      password: registerPassword 
    };
    
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setShowRegister(false);
    setRegisterName('');
    setRegisterEmail('');
    setRegisterPassword('');
    setRegisterConfirmPassword('');
    showNotification('Sucesso!', 'Conta criada com sucesso!', 'success');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCart([]);
    setShowMobileMenu(false);
    showNotification('Logout', 'Você saiu da sua conta.', 'info');
  };

  const addToCart = (produto, tamanho, cor) => {
    if (!currentUser) {
      showNotification('Login necessário', 'Faça login para adicionar produtos ao carrinho.', 'error');
      return;
    }
    const cartItem = {
      id: Date.now(),
      produtoId: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      imagem: produto.imagem,
      tamanho,
      cor,
      quantidade: 1
    };
    setCart(prev => [...prev, cartItem]);
    showNotification('Produto adicionado!', `${produto.nome} foi adicionado ao carrinho.`, 'success');
  };

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
    showNotification('Item removido', 'Produto removido do carrinho.', 'info');
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === itemId ? { ...item, quantidade: newQuantity } : item
    ));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  };

  const handleCheckoutSubmit = async () => {
  if (!checkoutName || !checkoutEmail || !checkoutPhone || !checkoutCpf || !checkoutStreet || !checkoutNumber || !checkoutNeighborhood || !checkoutCity || !checkoutState || !checkoutZip) {
    showNotification('Erro', 'Por favor, preencha todos os campos obrigatórios.', 'error');
    return;
  }
  
  setIsGeneratingPix(true);
  
  try {
    const pixPayload = {
      identifier: `pedido_${Date.now()}`,
      amount: Math.round(getTotalPrice() * 100) / 100, // valor em centavos
      client: {
        name: checkoutName,
        email: checkoutEmail,
        document: checkoutCpf.replace(/\D/g, '')
      }
    };

    console.log('Sending PIX request:', pixPayload);

    const response = await fetch('/api/pix', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pixPayload)
    });
    
    const datapix = await response.json();
    console.log('data:', datapix);
    setcode(datapix.pix.code)
    setbase64(datapix.pix.base64)
    setshowpay(true)
    
    // Check if response is successful and has the expected structure
    if (response.ok && datapix.status === 'OK' && datapix.pix && datapix.pix.code) {
      setPixData(datapix);
      showNotification('PIX Gerado!', 'QR Code PIX criado com sucesso!', 'success');
    } else {
      // Handle different error scenarios
      let errorMessage = 'Erro desconhecido ao gerar PIX';
      
      if (!response.ok) {
        errorMessage = datapix?.error || `Erro HTTP ${response.status}`;
      } else if (datapix.status !== 'OK') {
        errorMessage = `Status da API: ${datapix.status}`;
      } else if (!datapix.pix || !datapix.pix.code) {
        errorMessage = 'Resposta da API incompleta - código PIX não recebido';
      }
      
      console.error('PIX generation failed:', datapix);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error('Erro ao gerar PIX:', error);
    showNotification('Erro', `Erro ao gerar PIX: ${error.message}`, 'error');
  } finally {
    setIsGeneratingPix(false);
  }
};
  const handlePaymentComplete = () => {
    showNotification('Compra realizada!', 'Pedido confirmado! Você receberá um email de confirmação em breve.', 'success');
    setShowCheckout(false);
    setCart([]);
    setPixData(null);
    // Limpar dados do checkout
    setCheckoutName('');
    setCheckoutEmail('');
    setCheckoutPhone('');
    setCheckoutCpf('');
    setCheckoutStreet('');
    setCheckoutNumber('');
    setCheckoutNeighborhood('');
    setCheckoutCity('');
    setCheckoutState('');
    setCheckoutZip('');
    setCheckoutComplement('');
  };

  // Fechar menu mobile ao redimensionar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowMobileMenu(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl">M</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                AmandaStore
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {currentUser ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 font-medium">
                    Olá, {currentUser.name}!
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Sair
                  </button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowLogin(true)}
                    className="flex items-center space-x-1 px-4 py-2 text-purple-600 hover:text-purple-800 transition-colors"
                  >
                    <User size={20} />
                    <span>Login</span>
                  </button>
                  <button
                    onClick={() => setShowRegister(true)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Cadastrar
                  </button>
                </div>
              )}

              <button
                onClick={() => setShowCart(true)}
                className="flex items-center space-x-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all relative"
              >
                <ShoppingCart size={20} />
                <span>Carrinho</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => setShowCart(true)}
                className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all relative"
              >
                <ShoppingCart size={20} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {cart.length}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden mt-4 py-4 border-t border-gray-200">
              {currentUser ? (
                <div className="space-y-4">
                  <div className="text-gray-700 font-medium px-2">
                    Olá, {currentUser.name}!
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-2 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Sair
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setShowLogin(true);
                      setShowMobileMenu(false);
                    }}
                    className="flex items-center space-x-2 px-2 py-2 text-purple-600 hover:text-purple-800 transition-colors w-full"
                  >
                    <User size={20} />
                    <span>Login</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowRegister(true);
                      setShowMobileMenu(false);
                    }}
                    className="block w-full text-left px-2 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Cadastrar
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      <section className="py-12 sm:py-20 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-800 mb-6">
            Moda que <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Expressa</span> Você
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8">
            Descubra as últimas tendências em moda com qualidade premium e estilo único
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full"></div>
        </div>
      </section>

      <section className="py-1 sm:py-1 px-4">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8 sm:mb-12">
            Nossa Coleção
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8">
            {produtos.map(produto => (
              <ProductCard key={produto.id} produto={produto} addToCart={addToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* Botões de Contato Flutuantes */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-30">
        <a
          href="https://wa.me/19994378031"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all transform hover:scale-110"
          title="Fale conosco no WhatsApp"
        >
          <MessageCircle size={24} />
        </a>
        <a
          href="https://instagram.com/oliveiraamandaa02"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-3 rounded-full shadow-lg transition-all transform hover:scale-110"
          title="Siga-nos no Instagram"
        >
          <Instagram size={24} />
        </a>
      </div>

      {/* Modais */}
      {showpay && (
  <div className="space-y-6 text-center">
    <div className="flex items-center justify-center mb-4">
      <svg className="w-8 h-8 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Pagamento via PIX</h3>
    </div>
    
    {/* QR Code Display com Next.js Image */}
    <div className="flex justify-center mb-6">
      <div className="bg-white p-4 rounded-2xl shadow-lg border-2 border-gray-200">
        {base64 ? (
          <Image
            src={`data:image/png;base64,${base64}`}
            alt="QR Code PIX"
            width={224}
            height={224}
            className="w-48 h-48 sm:w-56 sm:h-56"
            priority
          />
        ) : (
          <div className="w-48 h-48 sm:w-56 sm:h-56 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">QR Code</span>
          </div>
        )}
      </div>
    </div>
    
    {/* Valor */}
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-xl mb-6">
      <p className="text-sm opacity-90 mb-1">Valor total a pagar:</p>
      <p className="text-2xl sm:text-3xl font-bold">R$ {getTotalPrice().toFixed(2)}</p>
    </div>
    
    {/* Código PIX */}
    <div className="bg-gray-50 p-4 rounded-xl mb-6">
      <p className="text-sm font-semibold text-gray-700 mb-3">Código PIX Copia e Cola:</p>
      <div className="bg-white p-3 rounded-lg border text-xs sm:text-sm break-all text-gray-800 font-mono leading-relaxed mb-3">
        {code}
      </div>
      <button
        onClick={() => copyPixCode(code)}
        className="flex items-center justify-center space-x-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-all font-semibold"
      >
        {copied ? (
          <>
            <Check size={18} />
            <span>Copiado!</span>
          </>
        ) : (
          <>
            <Copy size={18} />
            <span>Copiar Código PIX</span>
          </>
        )}
      </button>
    </div>
    
    {/* Instruções */}
    <div className="bg-blue-50 p-4 rounded-xl text-left mb-6">
      <h4 className="font-semibold text-blue-900 mb-3">Como pagar:</h4>
      <ul className="space-y-2 text-sm text-blue-800">
        <li className="flex items-start">
          <span className="font-bold mr-2">1.</span>
          <span>Abra o app do seu banco</span>
        </li>
        <li className="flex items-start">
          <span className="font-bold mr-2">2.</span>
          <span>Escaneie o QR Code ou copie o código PIX</span>
        </li>
        <li className="flex items-start">
          <span className="font-bold mr-2">3.</span>
          <span>Confirme o pagamento no seu aplicativo</span>
        </li>
        <li className="flex items-start">
          <span className="font-bold mr-2">4.</span>
          <span>Clique em Confirmar Pagamento abaixo</span>
        </li>
      </ul>
    </div>
    
    {/* Tempo limite */}
    <div className="text-center text-sm text-gray-600 mb-6">
      Este PIX é válido por 30 minutos
    </div>
    
    {/* Botões de ação */}
    <div className="space-y-3">
      <button
        onClick={handlePaymentComplete}
        className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl hover:from-green-700 hover:to-green-800 transition-all font-bold text-lg shadow-lg"
      >
        Confirmar Pagamento Realizado
      </button>
      
      <button
        onClick={() => {
          setcode('');
          setbase64('');
          setPixData(null);
          setshowpay(false);
        }}
        className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-xl transition-all font-semibold"
      >
        Gerar Novo PIX
      </button>
    </div>
  </div>
)}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto mx-2 sm:mx-0">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Fazer Login</h2>
              <button 
                onClick={() => setShowLogin(false)}
                className="text-gray-500 hover:text-gray-700 text-xl sm:text-2xl"
              >
                <X />
              </button>
            </div>
            <div className="p-4 sm:p-6">
              <div className="space-y-4">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Sua senha"
                  />
                </div>
                <button
                  onClick={handleLogin}
                  className="w-full bg-purple-600 text-white py-2 sm:py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold text-sm sm:text-base"
                >
                  Entrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showRegister && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto mx-2 sm:mx-0">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Criar Conta</h2>
              <button 
                onClick={() => setShowRegister(false)}
                className="text-gray-500 hover:text-gray-700 text-xl sm:text-2xl"
              >
                <X />
              </button>
            </div>
            <div className="p-4 sm:p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
                  <input
                    type="text"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Senha (mín. 6 caracteres)</label>
                  <input
                    type="password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Sua senha"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar senha</label>
                  <input
                    type="password"
                    value={registerConfirmPassword}
                    onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Confirme sua senha"
                  />
                </div>
                <button
                  onClick={handleRegister}
                  className="w-full bg-purple-600 text-white py-2 sm:py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold text-sm sm:text-base"
                >
                  Criar Conta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCart && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto mx-2 sm:mx-0">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Carrinho de Compras</h2>
              <button 
                onClick={() => setShowCart(false)}
                className="text-gray-500 hover:text-gray-700 text-xl sm:text-2xl"
              >
                <X />
              </button>
            </div>
            <div className="p-4 sm:p-6">
              {cart.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Seu carrinho está vazio</p>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 border rounded-lg">
                      <Image
                        src={item.imagem} 
                        alt={item.nome}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 text-sm sm:text-base truncate">{item.nome}</h4>
                        <p className="text-xs sm:text-sm text-gray-600">{item.tamanho} - {item.cor}</p>
                        <p className="font-bold text-purple-600 text-sm sm:text-base">R$ {item.preco.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantidade - 1)}
                          className="p-1 text-gray-600 hover:text-gray-800"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="mx-1 sm:mx-2 font-semibold text-sm">{item.quantidade}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantidade + 1)}
                          className="p-1 text-gray-600 hover:text-gray-800"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center text-lg sm:text-xl font-bold text-gray-800">
                      <span>Total:</span>
                      <span className="text-purple-600">R$ {getTotalPrice().toFixed(2)}</span>
                    </div>
                    <button
                      onClick={() => {
                        setShowCart(false);
                        setShowCheckout(true);
                      }}
                      className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold text-sm sm:text-base"
                    >
                      Finalizar Compra
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto mx-2 sm:mx-0">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Finalizar Compra</h2>
              <button 
                onClick={() => {
                  setShowCheckout(false);
                  setPixData(null);
                }}
                className="text-gray-500 hover:text-gray-700 text-xl sm:text-2xl"
              >
                <X />
              </button>
            </div>
            <div className="p-4 sm:p-6">
              {!pixData ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Dados Pessoais</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <input
                        type="text"
                        placeholder="Nome completo"
                        value={checkoutName}
                        onChange={(e) => setCheckoutName(e.target.value)}
                        className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        value={checkoutEmail}
                        onChange={(e) => setCheckoutEmail(e.target.value)}
                        className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                      />
                      <input
                        type="tel"
                        placeholder="Telefone"
                        value={checkoutPhone}
                        onChange={(e) => setCheckoutPhone(e.target.value)}
                        className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                      />
                      <input
                        type="text"
                        placeholder="CPF"
                        value={checkoutCpf}
                        onChange={(e) => setCheckoutCpf(e.target.value)}
                        className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Endereço de Entrega</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          placeholder="Rua"
                          value={checkoutStreet}
                          onChange={(e) => setCheckoutStreet(e.target.value)}
                          className="col-span-2 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                        />
                        <input
                          type="text"
                          placeholder="Nº"
                          value={checkoutNumber}
                          onChange={(e) => setCheckoutNumber(e.target.value)}
                          className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Bairro"
                        value={checkoutNeighborhood}
                        onChange={(e) => setCheckoutNeighborhood(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Cidade"
                          value={checkoutCity}
                          onChange={(e) => setCheckoutCity(e.target.value)}
                          className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                        />
                        <select
                          value={checkoutState}
                          onChange={(e) => setCheckoutState(e.target.value)}
                          className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                        >
                          <option value="">Estado</option>
                          <option value="SP">São Paulo</option>
                          <option value="RJ">Rio de Janeiro</option>
                          <option value="MG">Minas Gerais</option>
                          <option value="RS">Rio Grande do Sul</option>
                          <option value="PR">Paraná</option>
                          <option value="SC">Santa Catarina</option>
                          <option value="BA">Bahia</option>
                          <option value="GO">Goiás</option>
                          <option value="ES">Espírito Santo</option>
                          <option value="DF">Distrito Federal</option>
                          <option value="CE">Ceará</option>
                          <option value="PE">Pernambuco</option>
                          <option value="PB">Paraíba</option>
                          <option value="RN">Rio Grande do Norte</option>
                          <option value="AL">Alagoas</option>
                          <option value="SE">Sergipe</option>
                          <option value="PI">Piauí</option>
                          <option value="MA">Maranhão</option>
                          <option value="TO">Tocantins</option>
                          <option value="MT">Mato Grosso</option>
                          <option value="MS">Mato Grosso do Sul</option>
                          <option value="AC">Acre</option>
                          <option value="RO">Rondônia</option>
                          <option value="RR">Roraima</option>
                          <option value="AM">Amazonas</option>
                          <option value="AP">Amapá</option>
                          <option value="PA">Pará</option>
                        </select>
                      </div>
                      <input
                        type="text"
                        placeholder="CEP"
                        value={checkoutZip}
                        onChange={(e) => setCheckoutZip(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                      />
                      <input
                        type="text"
                        placeholder="Complemento (opcional)"
                        value={checkoutComplement}
                        onChange={(e) => setCheckoutComplement(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg sm:text-xl font-bold text-gray-800 mb-6">
                      <span>Total a pagar:</span>
                      <span className="text-purple-600">R$ {getTotalPrice().toFixed(2)}</span>
                    </div>
                    
                    <button
                      onClick={handleCheckoutSubmit}
                      disabled={isGeneratingPix}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 sm:py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-bold text-sm sm:text-lg flex items-center justify-center disabled:opacity-50"
                    >
                      {isGeneratingPix ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Gerando PIX...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                          </svg>
                          Gerar PIX
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-800">Pagamento via PIX</h3>
                  
                  {pixData.pix.base64 && (
                    <div className="flex justify-center">
                      <Image
                        src={`data:image/png;base64,${pixData.pix.base64}`}
                        alt="QR Code PIX"
                        className="w-48 h-48 border rounded-lg"
                      />
                    </div>
                  )}
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Código PIX Copia e Cola:</p>
                    <div className="bg-white p-3 rounded border text-xs break-all">
                      {pixData.pix.code}
                    </div>
                    <button
                      onClick={() => navigator.clipboard.writeText(pixData.pix.code)}
                      className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Copiar código
                    </button>
                  </div>
                  
                  <div className="text-lg font-bold text-purple-600">
                    Valor: R$ {getTotalPrice().toFixed(2)}
                  </div>
                  
                  <p className="text-sm text-gray-600">
                    Escaneie o QR Code ou copie o código PIX para realizar o pagamento
                  </p>
                  
                  <button
                    onClick={handlePaymentComplete}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition-all font-bold"
                  >
                    Confirmar Pagamento
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de mensagens */}
      {showMessage && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`bg-white rounded-2xl p-6 max-w-sm w-full mx-4 border-2 ${
            messageContent.type === 'success' ? 'text-green-600 border-green-200 bg-green-50' :
            messageContent.type === 'error' ? 'text-red-600 border-red-200 bg-red-50' :
            messageContent.type === 'warning' ? 'text-yellow-600 border-yellow-200 bg-yellow-50' :
            'text-blue-600 border-blue-200 bg-blue-50'
          }`}>
            <div className="text-center">
              <div className="text-4xl mb-4">
                {messageContent.type === 'success' ? '✅' :
                 messageContent.type === 'error' ? '❌' :
                 messageContent.type === 'warning' ? '⚠️' : 'ℹ️'}
              </div>
              <h3 className="text-lg font-bold mb-2">{messageContent.title}</h3>
              <p className="text-gray-600 mb-4">{messageContent.message}</p>
              <button
                onClick={() => setShowMessage(false)}
                className="bg-gray-100 hover:bg-gray-200 px-6 py-2 rounded-lg transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Componente ProductCard separado
const ProductCard = ({ produto, addToCart }) => {
  const [selectedSize, setSelectedSize] = useState(produto.tamanhos[0]);
  const [selectedColor, setSelectedColor] = useState(produto.cores[0]);

  // Carrossel de imagens
  const imagens = [produto.imagem, produto.imagem2, produto.imagem3].filter(Boolean);
  const [index, setIndex] = useState(0);

  const nextImage = () => setIndex((prev) => (prev + 1) % imagens.length);
  const prevImage = () => setIndex((prev) => (prev - 1 + imagens.length) % imagens.length);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 border border-gray-100">
      {/* Imagem / carrossel */}
      <div className="relative overflow-hidden">
        <Image
          src={imagens[index]}
          alt={produto.nome}
          width={300}
          height={300}
          className="w-full h-64 sm:h-80 object-cover transition-transform duration-300 hover:scale-110"
        />

        {/* Navegação de imagens */}
        {imagens.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 backdrop-blur-sm rounded-full p-1 text-lg"
            >
              ◀
            </button>
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 backdrop-blur-sm rounded-full p-1 text-lg"
            >
              ▶
            </button>
          </>
        )}

        {/* Preço */}
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1">
          <span className="text-lg sm:text-2xl font-bold text-purple-600">
            R$ {produto.preco.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Informações do produto */}
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">{produto.nome}</h3>

        <div className="space-y-4">
          {/* Tamanhos */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tamanho:</label>
            <div className="flex gap-2 flex-wrap">
              {produto.tamanhos.map((tamanho) => (
                <button
                  key={tamanho}
                  onClick={() => setSelectedSize(tamanho)}
                  className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
                    selectedSize === tamanho
                      ? "bg-purple-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tamanho}
                </button>
              ))}
            </div>
          </div>

          {/* Cores */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Cor:</label>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base bg-white text-black caret-black dark:bg-gray-800 dark:text-white dark:caret-white"
            >
              {produto.cores.map((cor) => (
                <option key={cor} value={cor}>
                  {cor}
                </option>
              ))}
            </select>
          </div>

          {/* Botão adicionar ao carrinho */}
          <button
            onClick={() => addToCart(produto, selectedSize, selectedColor)}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 sm:py-4 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base"
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
};


export default LojaRoupas;