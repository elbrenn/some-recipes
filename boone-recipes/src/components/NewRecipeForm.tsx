import React, { useState } from 'react';
import { Form, Button, Col, Row, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { apiBaseUrl, parseApiBaseUrl, supportedUrls } from '../constants';
import { Recipe, User } from '../types'
import DynamicInput from './DynamicInput';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

interface Item {
  value: string;
  id: string;
}

type NewRecipe = Omit<Recipe, 'id'>;

interface Props {
  handleClose: () => void;
  loggedInUser: User | null | undefined;
}

const NewRecipeForm: React.FC<Props> = ({handleClose, loggedInUser}: Props) => {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');

  const [ingredients, setIngredients] = useState<Item[]>([]);
  const [directions, setDirections] = useState<Item[]>([]);
  const [notes, setNotes] = useState<Item[]>([]);
  const [tags, setTags] = useState<Item[]>([]);

  const [isImporting, setIsImporting] = useState(false);
  const [ hostName, setHostname] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const [image, setImage] = useState('');

  const newItem = (value: string): Item => {
    return { value: value, id: uuid() }
  }

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
    if (e.target.value === "") {
      setHostname('');
      setIsSupported(true);
      return;
    }
    try {
      const host = new URL(e.target.value).hostname;
      setHostname(host);
      if (supportedUrls.find(u => u === host || 'www.' + u === host) !== undefined) {
        setIsSupported(true)
      } else {
        setIsSupported(false);
      }
    } catch {
      setHostname('');
      setIsSupported(false);
      return;
    }
  }

  const handleImport = async () => {
    setIsImporting(true);
    const recipe = await axios.get(`${parseApiBaseUrl}${link}`);
    if (recipe.status === 200 && recipe.data) {
      setIngredients(recipe.data.ingredients?.map((i: string) => newItem(i)))
      setDirections(recipe.data.directions?.map((i: string) => newItem(i)));
      setTitle(recipe.data.title);
      setNotes([
        newItem(`Total time: ${recipe.data.total_time}`),
        newItem(`Yields: ${recipe.data.yields}`)
      ])
      setIsImporting(false);
      const splitTitle = recipe.data.title.split(" ")
      setTags(splitTitle.map((t: string) => newItem(t)));
      setImage(recipe.data.image);
    }
    setIsImporting(false);
  }

  const handleSubmit = async (event: React.FormEvent<EventTarget>) => {
    const recipe: NewRecipe = {
        ingredients: ingredients.flatMap(i => i.value === "" ? [] : i.value),
        title: title,
        description: description,
        reviews: [],
        directions: directions.flatMap(d => d.value === "" ? [] : d.value),
        tags: tags.flatMap(t => t.value === "" ? [] : t.value),
        notes: notes.flatMap(n => n.value === "" ? [] : n.value),
        link: link,
        user: loggedInUser ? loggedInUser : undefined,
        imageURL: image === "" ? undefined : image
      }
      event.preventDefault();
      event.stopPropagation();
      // TODO: add toast notification
      const response = await axios.post(`${apiBaseUrl}/recipes`, recipe);
      if (response.status === 200) {
        if (response.data) {
          history.push(`/recipes/${response.data.id}`);
        }
      }
      handleClose();
    };

    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text"
            required
            placeholder="Recipe title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            />
        </Form.Group>
        <Form.Group>
          <Form.Label>Link</Form.Label>
          <Row>
            <Col>
              <Form.Control type="text"
                required={false}
                placeholder="www.example.com"
                value={link}
                onChange={handleLinkChange}
                />
            </Col>
            <Col xs={3}>
              <Button disabled={ link === "" || !isSupported } onClick={handleImport}>
                {
                  isImporting ?
                  <Spinner animation="border"/>
                  : "Import"
                }
              </Button>
            </Col>
          </Row>
          {
            isSupported || !hostName ?
              null :
              <Row>
                <Col>
                    <p>
                      Sorry, {hostName ? hostName : "that domain"} is not currently supported.{ ' ' }
                      <a href="https://github.com/boonepeter/some-recipes/issues" target="_blank" rel="noopener noreferrer">Suggest it here</a>
                    </p>
                </Col>
              </Row>
          }
        </Form.Group>
        {
          image ? 
          <a href={image}>Image link</a>
          : null
        }
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea"
            rows={3}
            placeholder="Short description..."
            onChange={({ target }) => setDescription(target.value)}
            />
        </Form.Group>
        <DynamicInput title="Ingredients" required startNum={3} itemList={ingredients} setItemList={setIngredients}/>
        <DynamicInput title="Directions" large required startNum={3} itemList={directions} setItemList={setDirections}/>
        <DynamicInput title="Tags" required itemList={tags} setItemList={setTags}/>
        <DynamicInput title="Notes" itemList={notes} setItemList={setNotes}/>
        <div className="container" style={{ marginTop: "20px", marginBottom: "20px"}}>
          <Button type="submit" size="lg" block>Submit</Button>
        </div>
      </Form>
    )
}

export default NewRecipeForm;