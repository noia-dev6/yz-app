import React, { useState, useRef, useEffect } from 'react';

export default function App() {
  const [messages, setMessages] = useState([
    { sender: 'yzai', text: 'Olá! Eu sou a Yzai, sua assistente de treino inteligente. Como posso te ajudar hoje?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [interactionCount, setInteractionCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    if (interactionCount >= 5) {
      setShowModal(true);
      return;
    }

    const newMessages = [...messages, { sender: 'user', text: inputText }];
    setMessages(newMessages);
    setInputText('');
    setInteractionCount(prev => prev + 1);

    setTimeout(() => {
      let botResponse = "Entendi! Vamos adaptar seu treino.";
      if (inputText.toLowerCase().includes('casa')) {
        botResponse = "Ótimo! Podemos montar um treino usando o peso do próprio corpo para você fazer em casa.";
      } else if (inputText.toLowerCase().includes('dor') || inputText.toLowerCase().includes('lesão')) {
        botResponse = "Aviso: Como IA, recomendo que consulte um médico ou fisioterapeuta para dores e lesões antes de continuar.";
      }
      
      setMessages(prev => [...prev, { sender: 'yzai', text: botResponse }]);
      
      if (interactionCount + 1 >= 5) {
         setTimeout(() => setShowModal(true), 1500);
      }
    }, 1000);
  };

  return (
    <div className="flex justify-center bg-[#0b1120] min-h-screen font-sans text-gray-100">
      <div className="w-full max-w-md bg-[#131b2c] flex flex-col relative shadow-2xl overflow-hidden">
        
        {/* Header Superior */}
        <div className="flex justify-between items-center p-5">
          <div className="flex items-center gap-3">
            <div className="bg-[#20c997] w-10 h-10 rounded-xl flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transform -rotate-45">
                <line x1="12" y1="4" x2="12" y2="20"></line>
                <line x1="8" y1="4" x2="16" y2="4"></line>
                <line x1="8" y1="20" x2="16" y2="20"></line>
              </svg>
            </div>
            <span className="text-xl font-bold text-white tracking-wide">Yz</span>
          </div>
          <button className="text-white hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </button>
        </div>

        {/* Persona Area (Como na Imagem 1) */}
        <div className="flex flex-col items-center pb-4 border-b border-gray-800/50">
          <div className="relative mb-3">
            <div className="w-[100px] h-[100px] rounded-full flex items-center justify-center border-2 border-[#20c997] shadow-[0_0_20px_rgba(32,201,151,0.25)] bg-[#1e293b] overflow-hidden">
            <img src="/image_5e6afc.png" alt="Yzai Persona" className="w-full h-full object-cover object-top text-[10px] text-white text-center flex items-center justify-center break-words" />            </div>
            <div className="absolute bottom-1 right-2 w-4 h-4 bg-[#22c55e] border-[3px] border-[#131b2c] rounded-full"></div>
          </div>
          <h2 className="text-xl font-bold text-white">Yzai</h2>
          <p className="text-[#20c997] text-sm mt-1">Interações: {interactionCount}/5</p>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} items-end`}>
              {msg.sender === 'yzai' && (
                <div className="w-8 h-8 rounded-full bg-[#1e293b] border border-gray-700 mr-2 mb-1 overflow-hidden shrink-0">
                  <img src="/image_5e6afc.png" alt="Yzai" className="w-full h-full object-cover object-top" />
                </div>
              )}
              <div className={`max-w-[80%] p-3 text-sm ${msg.sender === 'user' ? 'bg-[#20c997] text-black rounded-2xl rounded-br-sm' : 'bg-[#1e293b] border border-gray-700 text-gray-200 rounded-2xl rounded-bl-sm'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-[#131b2c] border-t border-gray-800">
          <div className="flex items-center gap-2 bg-[#1e293b] border border-gray-700 rounded-full px-4 py-2">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-transparent text-white focus:outline-none text-sm placeholder-gray-500"
              disabled={interactionCount >= 5}
            />
            <button 
              onClick={handleSend}
              disabled={interactionCount >= 5 || !inputText.trim()}
              className="text-[#20c997] hover:text-[#19a57b] disabled:opacity-50 flex-shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal de Cadastro (Como na Imagem 2) */}
        {showModal && (
          <div className="absolute inset-0 bg-[#060a13]/80 flex items-center justify-center z-50 p-4">
            <div className="bg-[#131b2c] rounded-[1.25rem] p-6 w-full max-w-sm border border-gray-800 shadow-2xl relative">
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="flex flex-col items-center text-center mt-2">
                <div className="w-16 h-16 rounded-full border border-[#20c997] bg-[#1a2333] flex items-center justify-center mb-6">
                   <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#20c997" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform -rotate-45">
                    <line x1="12" y1="4" x2="12" y2="20"></line>
                    <line x1="8" y1="4" x2="16" y2="4"></line>
                    <line x1="8" y1="20" x2="16" y2="20"></line>
                  </svg>
                </div>
                <h2 className="text-[1.35rem] font-bold text-white mb-3">Continue treinando!</h2>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  Você atingiu o limite de 5 interações gratuitas.<br/>
                  Cadastre-se para liberar o acesso total à Yzai e salvar<br/> seu histórico.
                </p>
                
                <div className="w-full space-y-4">
                  <input 
                    type="email" 
                    placeholder="Seu melhor e-mail" 
                    className="w-full bg-[#1e293b] border border-gray-700/50 text-white rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#20c997] placeholder-gray-500"
                  />
                  <input 
                    type="password" 
                    placeholder="Senha" 
                    className="w-full bg-[#1e293b] border border-gray-700/50 text-white rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#20c997] placeholder-gray-500"
                  />
                  <button className="w-full bg-[#20c997] hover:bg-[#19a57b] text-black font-bold py-3.5 px-4 rounded-xl transition-colors mt-2">
                    Criar Conta Grátis
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
