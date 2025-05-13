import React, { useState, useRef, useEffect } from 'react';
import {
  Typography,
  Box,
  Container,
  Paper,
  TextField,
  IconButton,
  Avatar,
  Divider,
  Button,
  Chip,
  Breadcrumbs,
  Link,
} from '@mui/material';
import {
  Send,
  AttachFile,
  EmojiEmotions,
  Close,
  CheckCircle,
} from '@mui/icons-material';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ChatContainer = styled(Paper)`
  height: calc(100vh - 300px);
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

const MessagesContainer = styled(Box)`
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MessageBubble = styled(Box)`
  max-width: 70%;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${({ isUser, theme }) =>
    isUser ? theme.palette.primary.main : theme.palette.grey[800]};
  color: ${({ isUser }) => (isUser ? 'white' : 'inherit')};
  align-self: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
`;

const InputContainer = styled(Box)`
  padding: 1rem;
  border-top: 1px solid ${({ theme }) => theme.palette.divider};
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Olá! Como posso ajudar você hoje?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: message,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setMessage('');
    setIsTyping(true);

    // Simular resposta do atendente
    setTimeout(() => {
      const response = {
        id: messages.length + 2,
        text: 'Entendi sua dúvida. Vou verificar e retornar em breve.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/ajuda">
              Ajuda
            </Link>
            <Typography color="text.primary">Chat</Typography>
          </Breadcrumbs>
        </Box>

        <Box sx={{ my: 4 }}>
          <Typography variant="h1" component="h1" gutterBottom>
            Chat de Suporte
          </Typography>
          <Typography variant="h5" color="textSecondary" paragraph>
            Converse com nossa equipe de suporte em tempo real
          </Typography>
        </Box>

        <ChatContainer elevation={3}>
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>S</Avatar>
              <Box>
                <Typography variant="subtitle1">Suporte EvenFlow</Typography>
                <Typography variant="body2" color="textSecondary">
                  Online
                </Typography>
              </Box>
            </Box>
          </Box>

          <MessagesContainer>
            {messages.map((msg) => (
              <MessageBubble key={msg.id} isUser={msg.isUser}>
                <Typography variant="body1">{msg.text}</Typography>
                <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                  {msg.timestamp.toLocaleTimeString()}
                </Typography>
              </MessageBubble>
            ))}
            {isTyping && (
              <MessageBubble isUser={false}>
                <Typography variant="body2">Digitando...</Typography>
              </MessageBubble>
            )}
            <div ref={messagesEndRef} />
          </MessagesContainer>

          <InputContainer>
            <IconButton>
              <AttachFile />
            </IconButton>
            <IconButton>
              <EmojiEmotions />
            </IconButton>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              placeholder="Digite sua mensagem..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              variant="outlined"
              size="small"
            />
            <IconButton
              color="primary"
              onClick={handleSendMessage}
              disabled={!message.trim()}
            >
              <Send />
            </IconButton>
          </InputContainer>
        </ChatContainer>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="textSecondary">
            Horário de atendimento: Segunda a Sexta, das 9h às 18h
          </Typography>
        </Box>
      </Container>
    </motion.div>
  );
};

export default Chat; 