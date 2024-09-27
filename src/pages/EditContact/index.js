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

export default function EditContact() {
    const [isLoading, setIsLoading] = useState(true);
    const [contactName, setContactName] = useState('');
    const contactFormRef = useRef(null);
    const { id } = useParams();
    const history = useHistory();

    async function handleSubmit(formData) {
        try {
            const contact = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                category_id: formData.categoryId,
            };

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
                contactFormRef.current.setFieldsValues(contactData);
                setIsLoading(false);
                setContactName(contactData.name);
            } catch {
                history.push('/');
                toast({
                    type: 'danger',
                    text: 'Contato não encontrado!',
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
