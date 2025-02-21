import PageHeader from '../../components/PageHeader';

import ContactForm from '../../components/ContactForm';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';
import { useRef } from 'react';

export default function NewContact() {
    const contactFormRef = useRef(null);
    async function handleSubmit(contact) {
        try {
            await ContactsService.createContacts(contact);
            contactFormRef.current.resetFields();
            toast({
                type: 'success',
                text: 'Contato Cadastrado com sucesso!',
            });
        } catch {
            toast({
                type: 'danger',
                text: 'Ocorreu um erro ao cadastrar um contato!',
            });
        }
    }
    return (
        <>
            <PageHeader title="Novo Contato" />
            <ContactForm
                ref={contactFormRef}
                onSubmit={handleSubmit}
                buttonLabel="Cadastrar"
            />
        </>
    );
}
