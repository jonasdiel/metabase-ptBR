import React, { Component, PropTypes } from "react";

import LoadingAndErrorWrapper from "metabase/components/LoadingAndErrorWrapper.jsx";
import ModalContent from "metabase/components/ModalContent.jsx";
import SortableItemList from "metabase/components/SortableItemList.jsx";

import { fetchCards, setEditingDashboard, addCardToDashboard } from "../actions";

export default class AddToDashSelectQuestionModal extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = { error: null };
    }

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        dashboard: PropTypes.object.isRequired,
        cards: PropTypes.array,
        onClose: PropTypes.func.isRequired
    };

    async componentDidMount() {
        try {
            await this.props.dispatch(fetchCards());
        } catch (error) {
            this.setState({ error });
        }
    }

    onAdd(card) {
        this.props.dispatch(addCardToDashboard({ dashId: this.props.dashboard.id, cardId: card.id }));
        this.props.dispatch(setEditingDashboard(true));
        this.props.onClose();
    }

    render() {
        var { error } = this.state;
        if (this.props.cards && this.props.cards.length === 0) {
            error = { message: "Não existem perguntas salvas." };
        }
        return (
            <ModalContent
                title="Adicionar pergunta ao Painel"
                closeFn={this.props.onClose}
            >
                <LoadingAndErrorWrapper loading={!this.props.cards} error={error} >
                {() =>
                    <SortableItemList
                        items={this.props.cards}
                        onClickItemFn={(card) => this.onAdd(card)}
                        showIcons={true}
                    />
                }
                </LoadingAndErrorWrapper>
            </ModalContent>
        );
    }
}
