import PageHeader from '../../components/PageHeader';

import ContactForm from '../../components/ContactForm';
import ContactsService from '../../services/ContactsService';

export default function NewContact() {
    async function handleSubmit(formData) {
        try {
            const contact = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                category_id: formData.categoryId,
            };

            const response = await ContactsService.createContacts(contact);

            console.log(response);
        } catch {
            alert('Ocorreu um erro ao cadastrar um contato!');
        }
    }
    return (
        <>
            <PageHeader title="Novo Contato" />
            <ContactForm onSubmit={handleSubmit} buttonLabel="Cadastrar" />
        </>
    );
}
