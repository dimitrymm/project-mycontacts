import emptyBox from '../../assets/images/empty-box.svg';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';
import sad from '../../assets/images/sad.svg';

import {
    Card,
    Container,
    EmptyListContainer,
    ErrorContainer,
    Header,
    InputSearchContainer,
    ListHeader,
    SearchNotFoundContainer,
} from './styles';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import Modal from '../../components/Modal';
import toast from '../../utils/toast';
import ContactsService from '../../services/ContactsService';

export default function Home() {
    const [contacts, setContacts] = useState([]);
    const [orderBy, setOrderBy] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);

    const filteredContacts = useMemo(
        () =>
            contacts.filter((contact) =>
                contact.name.toLowerCase().includes(searchTerm.toLowerCase()),
            ),
        [contacts, searchTerm],
    );

    const loadContacts = useCallback(async () => {
        try {
            setIsLoading(true);
            const contactsList = await ContactsService.listContacts(orderBy);

            setContacts(contactsList);

            setHasError(false);
            setIsLoading(false);
        } catch {
            setHasError(true);
        } finally {
            setIsLoading(false);
        }
    }, [orderBy]);

    useEffect(() => {
        loadContacts();
    }, [loadContacts]);

    function handleToggleOrderBy() {
        setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
    }

    function handleChangeSearchTerm(event) {
        setSearchTerm(event.target.value);
    }
    function handleTryAgain() {
        loadContacts();
    }
    function handleDeleteContact(contact) {
        setContactBeingDeleted(contact);
        setIsDeleteModalVisible(true);
    }
    function handleCloseDeleteModal() {
        setIsDeleteModalVisible(false);
        setContactBeingDeleted(null);
    }
    async function handleConfirmDeleteContact() {
        try {
            setIsLoadingDelete(true);
            await ContactsService.deleteContact(contactBeingDeleted.id);
            setContacts((prevState) =>
                prevState.filter(
                    (contact) => contact.id !== contactBeingDeleted.id,
                ),
            );
            handleCloseDeleteModal();
            toast({
                type: 'success',
                text: 'Contato deletado com sucesso!',
            });
        } catch {
            toast({
                type: 'danger',
                text: 'Ocorreu um problema ao deletar um contato!',
            });
        } finally {
            setIsLoadingDelete(false);
        }
    }
    return (
        <Container>
            <Loader isLoading={isLoading} />
            <Modal
                isLoading={isLoadingDelete}
                visible={isDeleteModalVisible}
                confirmlabel="Deletar"
                danger
                title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}" ?`}
                onCancel={handleCloseDeleteModal}
                onConfirm={handleConfirmDeleteContact}
            >
                <p>Esta ação não poderá ser desfeita</p>
            </Modal>

            {contacts.length > 0 && (
                <InputSearchContainer>
                    <input
                        value={searchTerm}
                        type="text"
                        placeholder="Pesquisar Contatos.."
                        onChange={handleChangeSearchTerm}
                    />
                </InputSearchContainer>
            )}

            <Header
                justifyContent={
                    hasError
                        ? 'flex-end'
                        : contacts.length > 0
                          ? 'space-between'
                          : 'center'
                }
                hasError={hasError}
            >
                {!hasError && contacts.length > 0 && (
                    <strong>
                        {filteredContacts.length}
                        {filteredContacts.length === 1
                            ? ' Contato'
                            : ' Contatos'}
                    </strong>
                )}

                <Link to="/new">Novo contato</Link>
            </Header>

            {hasError && (
                <ErrorContainer>
                    <img src={sad} alt="Sad" />

                    <div className="details">
                        <strong>Ocorreu um erro ao obter seus contatos</strong>

                        <Button type="button" onClick={handleTryAgain}>
                            Tentar Novamente
                        </Button>
                    </div>
                </ErrorContainer>
            )}
            {!hasError && (
                <>
                    {contacts.length < 1 && !isLoading && (
                        <EmptyListContainer>
                            <img src={emptyBox} alt="" />
                            <p>
                                Você ainda não tem nenhum contato cadastrado!
                                Clique no botão
                                <strong>”Novo contato”</strong>à cima para
                                cadastrar o seu primeiro!
                            </p>
                        </EmptyListContainer>
                    )}

                    {contacts.length > 0 && filteredContacts.length < 1 && (
                        <SearchNotFoundContainer>
                            <img
                                src={magnifierQuestion}
                                alt="Magnifier question"
                            />
                            <span>
                                Nenhum resultado foi encontrado para{' '}
                                <strong>{searchTerm}</strong>.
                            </span>
                        </SearchNotFoundContainer>
                    )}

                    {filteredContacts.length > 0 && (
                        <ListHeader orderBy={orderBy}>
                            <button
                                type="button"
                                onClick={handleToggleOrderBy}
                                className="sort-button"
                            >
                                <span>Nome</span>
                                <img src={arrow} alt="Arrow" />
                            </button>
                        </ListHeader>
                    )}

                    {filteredContacts.map((contact) => (
                        <Card key={contact.id}>
                            <div className="info">
                                <div className="contact-name">
                                    <strong>{contact.name}</strong>
                                    {contact.category.name && (
                                        <small>{contact.category.name}</small>
                                    )}
                                </div>
                                <span>{contact.email}</span>
                                <span>{contact.phone}</span>
                            </div>
                            <div className="actions">
                                <Link to={`/edit/${contact.id}`}>
                                    <img src={edit} alt="Edit" />
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => handleDeleteContact(contact)}
                                >
                                    <img src={trash} alt="Delete" />
                                </button>
                            </div>
                        </Card>
                    ))}
                </>
            )}
        </Container>
    );
}
