
import React from 'react';
import { v4 as uuid } from 'uuid';
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

interface Item {
    value: string;
    id: string;
}

interface Props {
    title: string;
    startNum?: number;
    itemList: Item[];
    setItemList: React.Dispatch<React.SetStateAction<Item[]>>;
}

const DynamicInput: React.FC<Props> = ({ title, startNum, itemList, setItemList }: Props) => {
    const newItem = (): Item => {
        return { value: '', id: uuid() }
    }

    React.useEffect(() => {
        setItemList([...Array(startNum)].map((x, i) => newItem()));
    }, [startNum, setItemList])

    const removeItem = (id: string) => {
        setItemList(itemList.filter(i => i.id !== id))
    }

    const addItem = () => {
        setItemList([...itemList, { ...newItem() }])
    }

    const isDisabled: boolean = itemList.length === 1;
    return (
        <div>
            <Form.Label>{title}</Form.Label>
            <Container style={{ marginBottom: "20px"}}>
            {
                itemList.map(i => (
                        <Row key={i.id} >
                        <Col >
                            <Form.Group>
                                <Form.Control 
                                    type="text"
                                    required
                                    value={i.value}
                                    onChange={({ target }) => i.value = target.value}
                                    />
                            </Form.Group>
                        </Col>
                        <Col xs={2}>
                                <Button disabled={isDisabled} variant="outline-secondary" onClick={() => removeItem(i.id)}>
                                    <FontAwesomeIcon icon={faMinus} />
                                </Button>
                        </Col>
                        </Row>
                ))
            }
            <Row>
                <Col>
                    <Button variant="light" onClick={addItem}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                </Col>
            </Row>
            </Container>
        </div>
    )
}

DynamicInput.defaultProps = {
    startNum: 1
}

export default DynamicInput;