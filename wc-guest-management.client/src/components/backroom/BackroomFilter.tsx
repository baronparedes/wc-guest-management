import React from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { getCurrentDateFormatted } from '../../@utils/dates';

const BackroomFilter = () => {
    return (
        <div>
            <Row>
                <InputGroup as={Col} sm={12} md={3} className="pb-3">
                    <Form.Control
                        required
                        name="visitDate"
                        size="lg"
                        type="date"
                        value={getCurrentDateFormatted()}
                        max={getCurrentDateFormatted()}
                    />
                </InputGroup>
                <InputGroup as={Col} sm={12} md={9} className="pb-3">
                    <Form.Control
                        required
                        name="search"
                        size="lg"
                        placeholder="search"
                    />
                    <InputGroup.Append>
                        <Button>search</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Row>
        </div>
    );
};

export default BackroomFilter;
