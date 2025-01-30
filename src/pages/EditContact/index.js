import {
    useHistory,
    useParams,
} from 'react-router-dom/cjs/react-router-dom.min';
import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import { useEffect, useRef, useState } from 'react';
import ContactsService from '../../services/ContactsService';
import Loader from '../../components/Loader';
import toast from '../../utils/toast';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';

export default function EditContact() {
    const [isLoading, setIsLoading] = useState(true);
    const [contactName, setContactName] = useState('');
    const contactFormRef = useRef(null);
    const { id } = useParams();
    const history = useHistory();
    const safeAsyncAction = useSafeAsyncAction();

    async function handleSubmit(contact) {
        try {
            const contactData = await ContactsService.updateContact(
                id,
                contact,
            );

            setContactName(contactData.name);

            toast({
                type: 'success',
                text: 'Contato Editado com sucesso!',
            });
        } catch {
            toast({
                type: 'danger',
                text: 'Ocorreu um erro ao editar um contato!',
            });
        }
    }

    useEffect(() => {
        async function loadContact() {
            try {
                const contactData = await ContactsService.getContactById(id);
                safeAsyncAction(() => {
                    contactFormRef.current.setFieldsValues(contactData);
                    setIsLoading(false);
                    setContactName(contactData.name);
                });
            } catch {
                safeAsyncAction(() => {
                    history.push('/');
                    toast({
                        type: 'danger',
                        text: 'Contato não encontrado!',
                    });
                });
            }
        }
        loadContact();
    }, [id, history]);

    return (
        <>
            <Loader isLoading={isLoading} />
            <PageHeader
                title={isLoading ? 'Carregando...' : `Editar ${contactName}`}
            />
            <ContactForm
                ref={contactFormRef}
                buttonLabel="Salvar Alterações"
                onSubmit={handleSubmit}
            />
        </>
    );
}
