<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Card from 'primevue/card'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'


const router = useRouter()

type FaqItem = { question: string; answer: string }

const faqItems = ref<FaqItem[]>([
  {
    question: 'Como altero minha senha?',
    answer: 'Acesse Configurações > Conta > Segurança e clique em "Alterar senha". Você precisará informar sua senha atual e a nova senha duas vezes para confirmação.'
  },
  {
    question: 'Como torno meu perfil privado?',
    answer: 'Vá em Configurações > Privacidade e ative a opção "Perfil privado". Com essa opção ativada, apenas pessoas que você aprovar poderão ver suas publicações.'
  },
  {
    question: 'Como bloqueio um usuário?',
    answer: 'Acesse o perfil do usuário, clique no menu (três pontos) e selecione "Bloquear". O usuário não poderá mais ver seu perfil ou interagir com você.'
  },
  {
    question: 'Como faço para baixar meus dados?',
    answer: 'Vá em Configurações > Status da conta e clique em "Baixar dados". Você receberá um arquivo com todas as suas informações em até 48 horas.'
  },
  {
    question: 'Como desativo notificações?',
    answer: 'Acesse Configurações > Notificações e desative as opções que desejar. Você pode personalizar notificações por tipo de atividade.'
  },
  {
    question: 'Como recupero minha conta?',
    answer: 'Na tela de login, clique em "Esqueci minha senha" e siga as instruções. Um link de recuperação será enviado para seu e-mail cadastrado.'
  },
  {
    question: 'Como excluo minha conta?',
    answer: 'Acesse Configurações > Conta > Zona de Perigo e clique em "Excluir conta permanentemente". ATENÇÃO: Esta ação é irreversível e todos os seus dados serão perdidos.'
  },
  {
    question: 'Como denuncio conteúdo impróprio?',
    answer: 'Clique no menu (três pontos) da publicação ou perfil e selecione "Denunciar". Nossa equipe analisará o caso em até 24 horas.'
  }
])

const openPanels = ref<string[]>([])

const quickActions = ref([
  { 
    icon: 'pi-comments', 
    label: 'Central de Ajuda', 
    description: 'Acesse nossa base de conhecimento completa',
    action: 'help-center'
  },
  { 
    icon: 'pi-envelope', 
    label: 'Contatar Suporte', 
    description: 'Fale diretamente com nossa equipe',
    action: 'contact'
  },
  { 
    icon: 'pi-file', 
    label: 'Políticas e Termos', 
    description: 'Leia nossos termos de uso e políticas',
    action: 'policies'
  },
  { 
    icon: 'pi-flag', 
    label: 'Denunciar Problema', 
    description: 'Reporte bugs ou problemas técnicos',
    action: 'report'
  }
])

const resources = ref([
  { icon: 'pi-book', label: 'Guia do Iniciante', url: '#' },
  { icon: 'pi-video', label: 'Tutoriais em Vídeo', url: '#' },
  { icon: 'pi-shield', label: 'Segurança e Privacidade', url: '#' },
  { icon: 'pi-users', label: 'Comunidade', url: '#' }
])

const searchQuery = ref('')

const goBack = () => {
  router.push('/settings')
}

const handleAction = (action: string) => {
  console.log('Ação:', action)
  switch(action) {
    case 'help-center':
      alert('Abrindo Central de Ajuda...')
      break
    case 'contact':
      alert('Abrindo formulário de contato...')
      break
    case 'policies':
      alert('Abrindo Políticas e Termos...')
      break
    case 'report':
      alert('Abrindo formulário de denúncia...')
      break
  }
}
</script>

<template>
  <div class="help-page">
    <div class="help-page__header">
      <Button
        icon="pi pi-arrow-left"
        @click="goBack"
        text
        rounded
        class="md:hidden"
        aria-label="Voltar"
      />
      <h1 class="help-page__title">Ajuda</h1>
    </div>

    <div class="help-page__content">
      
      <Card class="search-card">
        <template #content>
          <div class="search-section">
            <i class="pi pi-search search-icon"></i>
            <div class="search-content">
              <h2 class="search-title">Como podemos ajudar?</h2>
              <p class="search-description">Pesquise por palavras-chave ou navegue pelas perguntas frequentes</p>
              <div class="search-input-wrapper">
                <span class="p-input-icon-left w-full">
                  <i class="pi pi-search" />
                  <InputText 
                    v-model="searchQuery"
                    placeholder="Buscar na ajuda..."
                    class="w-full search-input"
                  />
                </span>
              </div>
            </div>
          </div>
        </template>
      </Card>

      <Card class="actions-card">
        <template #header>
          <div class="card-header">
            <i class="pi pi-bolt card-icon"></i>
            <h3 class="card-title">Acesso Rápido</h3>
          </div>
        </template>
        <template #content>
          <div class="quick-actions">
            <button
              v-for="action in quickActions"
              :key="action.action"
              class="quick-action-item"
              @click="handleAction(action.action)"
            >
              <div class="action-icon-wrapper">
                <i :class="`pi ${action.icon}`" class="action-icon"></i>
              </div>
              <div class="action-info">
                <span class="action-label">{{ action.label }}</span>
                <span class="action-description">{{ action.description }}</span>
              </div>
              <i class="pi pi-chevron-right action-chevron"></i>
            </button>
          </div>
        </template>
      </Card>

      <Card class="faq-card">
        <template #header>
          <div class="card-header">
            <i class="pi pi-question-circle card-icon"></i>
            <h3 class="card-title">Perguntas Frequentes</h3>
          </div>
        </template>
        <template #content>
          <Accordion :multiple="true" v-model:value="openPanels">
            <AccordionPanel
              v-for="(item, i) in faqItems"
              :key="i"
              :value="String(i)"
            >
              <AccordionHeader>{{ item.question }}</AccordionHeader>
              <AccordionContent>
                {{ item.answer }}
              </AccordionContent>
            </AccordionPanel>
          </Accordion>

        </template>
      </Card>

      <Card class="resources-card">
        <template #header>
          <div class="card-header">
            <i class="pi pi-bookmark card-icon"></i>
            <h3 class="card-title">Recursos Úteis</h3>
          </div>
        </template>
        <template #content>
          <div class="resources-grid">
            <a
              v-for="resource in resources"
              :key="resource.label"
              :href="resource.url"
              class="resource-item"
            >
              <i :class="`pi ${resource.icon}`" class="resource-icon"></i>
              <span class="resource-label">{{ resource.label }}</span>
              <i class="pi pi-external-link resource-external"></i>
            </a>
          </div>
        </template>
      </Card>

      <Card class="contact-card">
        <template #content>
          <div class="contact-section">
            <i class="pi pi-headphones contact-icon"></i>
            <div class="contact-content">
              <h3 class="contact-title">Ainda precisa de ajuda?</h3>
              <p class="contact-description">
                Nossa equipe está disponível 24/7 para ajudá-lo
              </p>
              <div class="contact-buttons">
                <Button
                  label="Chat ao vivo"
                  icon="pi pi-comments"
                  class="contact-button"
                />
                <Button
                  label="Enviar e-mail"
                  icon="pi pi-envelope"
                  outlined
                  class="contact-button"
                />
              </div>
            </div>
          </div>
        </template>
      </Card>

    </div>
  </div>
</template>

<style scoped>
.help-page {
  min-height: 100vh;
  background: #f8f9fa;
}

.dark .help-page {
  background: #0f1419;
}

.help-page__header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 2rem;
  background: white;
  border-bottom: 1px solid #e5e7eb;
}

.dark .help-page__header {
  background: #16181c;
  border-bottom-color: #2f3336;
}

.help-page__title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #0f1419;
  margin: 0;
}

.dark .help-page__title {
  color: #ffffff;
}

@media (max-width: 768px) {
  .help-page__header {
    padding: 1rem;
    gap: 0.75rem;
  }

  .help-page__title {
    font-size: 1.125rem;
    font-weight: 600;
  }
}

@media (max-width: 480px) {
  .help-page__header {
    padding: 0.875rem 0.75rem;
  }

  .help-page__title {
    font-size: 1rem;
  }
}

.help-page__content {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (max-width: 768px) {
  .help-page__content {
    padding: 1rem;
    gap: 0.875rem;
  }
}

@media (max-width: 480px) {
  .help-page__content {
    padding: 0.75rem;
    gap: 0.75rem;
  }
}

.search-card,
.actions-card,
.faq-card,
.resources-card,
.contact-card {
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  box-shadow: none;
}

@media (max-width: 480px) {
  .search-card,
  .actions-card,
  .faq-card,
  .resources-card,
  .contact-card {
    border-radius: 0.5rem;
  }
}

.dark .search-card,
.dark .actions-card,
.dark .faq-card,
.dark .resources-card,
.dark .contact-card {
  border-color: #2f3336;
  background: #16181c;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem 1.5rem 0;
}

.card-icon {
  font-size: 1.25rem;
  color: #1d9bf0;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #0f1419;
  margin: 0;
}

.dark .card-title {
  color: #ffffff;
}

:deep(.p-card-content) {
  padding: 1.5rem;
}

.search-section {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

@media (max-width: 768px) {
  .search-section {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}

.search-icon {
  font-size: 3rem;
  color: #1d9bf0;
  flex-shrink: 0;
}

.search-content {
  flex: 1;
  width: 100%;
}

.search-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f1419;
  margin: 0 0 0.5rem 0;
}

.dark .search-title {
  color: #ffffff;
}

.search-description {
  color: #536471;
  margin: 0 0 1rem 0;
}

.dark .search-description {
  color: #8b98a5;
}

.search-input-wrapper {
  width: 100%;
}

.search-input {
  height: 3rem;
  font-size: 1rem;
}

.quick-actions {
  display: grid;
  gap: 0.5rem;
}

@media (min-width: 768px) {
  .quick-actions {
    grid-template-columns: repeat(2, 1fr);
  }
}

.quick-action-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}

.dark .quick-action-item {
  border-color: #2f3336;
}

.quick-action-item:hover {
  background: #f7f9f9;
  border-color: #1d9bf0;
}

.dark .quick-action-item:hover {
  background: #1c1f23;
}

.action-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  background: #e0f2fe;
  flex-shrink: 0;
}

.dark .action-icon-wrapper {
  background: #1e3a5f;
}

.action-icon {
  font-size: 1.5rem;
  color: #1d9bf0;
}

.action-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.action-label {
  font-size: 1rem;
  font-weight: 600;
  color: #0f1419;
}

.dark .action-label {
  color: #ffffff;
}

.action-description {
  font-size: 0.875rem;
  color: #536471;
}

.dark .action-description {
  color: #8b98a5;
}

.action-chevron {
  color: #8b98a5;
  font-size: 1rem;
}

.faq-accordion {
  border: none;
}

:deep(.p-accordion-tab) {
  margin-bottom: 0.5rem;
}

:deep(.p-accordion-header) {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.dark :deep(.p-accordion-header) {
  border-color: #2f3336;
}

:deep(.p-accordion-header-link) {
  font-weight: 500;
  padding: 1rem;
}

.dark :deep(.p-accordion-header-link) {
  background: #1c1f23;
  color: #ffffff;
}

.accordion-header-text {
  font-size: 1rem;
  font-weight: 500;
}

.faq-answer {
  color: #536471;
  line-height: 1.6;
  margin: 0;
}

.dark .faq-answer {
  color: #8b98a5;
}

.resources-grid {
  display: grid;
  gap: 0.75rem;
}

@media (min-width: 768px) {
  .resources-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.resource-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  text-decoration: none;
  transition: all 0.2s;
}

.dark .resource-item {
  border-color: #2f3336;
}

.resource-item:hover {
  background: #f7f9f9;
  border-color: #1d9bf0;
}

.dark .resource-item:hover {
  background: #1c1f23;
}

.resource-icon {
  font-size: 1.25rem;
  color: #1d9bf0;
}

.resource-label {
  flex: 1;
  font-size: 1rem;
  font-weight: 500;
  color: #0f1419;
}

.dark .resource-label {
  color: #ffffff;
}

.resource-external {
  font-size: 0.875rem;
  color: #8b98a5;
}

.contact-section {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

@media (max-width: 768px) {
  .contact-section {
    flex-direction: column;
    text-align: center;
  }
}

.contact-icon {
  font-size: 3rem;
  color: #1d9bf0;
  flex-shrink: 0;
}

.contact-content {
  flex: 1;
}

.contact-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f1419;
  margin: 0 0 0.5rem 0;
}

.dark .contact-title {
  color: #ffffff;
}

.contact-description {
  color: #536471;
  margin: 0 0 1rem 0;
}

.dark .contact-description {
  color: #8b98a5;
}

.contact-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .contact-buttons {
    flex-direction: column;
  }
  
  .contact-button {
    width: 100%;
  }
}
</style>