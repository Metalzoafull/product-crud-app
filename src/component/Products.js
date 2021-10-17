import React, { Component } from 'react';
import { ProductService } from "../service/ProductService";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
//import { InputText } from 'primereact/inputtext';


export default class Products extends Component {
    constructor() {
        super();
        this.state = {
            first1: 0,
            rows1: 4
        };
        this.productService = new ProductService();
        this.onCustomPage1 = this.onCustomPage1.bind(this);
        this.onPageInputKeyDown = this.onPageInputKeyDown.bind(this);
        this.onPageInputChange = this.onPageInputChange.bind(this);

    };

    onCustomPage1(event) {
        this.setState({
            first1: event.first,
            rows1: event.rows,
            currentPage: event.page + 1
        });
    }

    onPageInputKeyDown(event, options) {
        if (event.key === 'Enter') {
            const page = parseInt(this.state.currentPage);
            if (page < 0 || page > options.totalPages) {
                this.setState({ pageInputTooltip: `Value must be between 1 and ${options.totalPages}.` })
            }
            else {
                const first = this.state.currentPage ? options.rows * (page - 1) : 0;

                this.setState({ first1: first, pageInputTooltip: 'Press \'Enter\' key to go to this page.' });
            }
        }
    }

    onPageInputChange(event) {
        this.setState({ currentPage: event.target.value });
    }

    componentDidMount() {
        this.productService.getAll().then(data => this.setState({ product: data }))
    };

    render() {
        const template1 = {
            layout: 'PrevPageLink PageLinks NextPageLink CurrentPageReport',
            'PrevPageLink': (options) => {
                return (
                    <Button label="Previous" className="p-button-raised p-button-secondary" onClick={options.onClick} disabled={options.disabled} />
                )
            },
            'NextPageLink': (options) => {
                return (
                    <Button label="Next" className="p-button-raised p-button-secondary" onClick={options.onClick} disabled={options.disabled} />
                )
            },
            'PageLinks': (options) => {
                if ((options.view.startPage === options.page && options.view.startPage !== 0) || (options.view.endPage === options.page && options.page + 1 !== options.totalPages)) {
                    const className = classNames(options.className, { 'p-disabled': true });
                    return <span className={className} style={{ userSelect: 'none' }}>...</span>;
                }

                return (
                    <Button label={options.page + 1} className={options.className} onClick={options.onClick} />
                )
            }/*,
            'CurrentPageReport': (options) => {
                return (
                    <span className="p-mx-3" style={{ color: 'var(--text-color)', userSelect: 'none' }}>
                        Go to <InputText size="2" className="p-ml-1" value={this.state.currentPage} tooltip={this.state.pageInputTooltip}
                            onKeyDown={(e) => this.onPageInputKeyDown(e, options)} onChange={this.onPageInputChange}/>
                    </span>
                )
            }*/
        };
        return (
            <Panel header="Product CRUD App" style={{ width: '80%', margin: '0 auto', marginTop: '20px' }}>
                <DataTable value={this.state.product} paginator paginatorTemplate={template1} first={this.state.first1} rows={this.state.rows1} onPage={this.onCustomPage1}>
                    <Column field="name" header="NAME"></Column>
                    <Column field="productType" header="PRODUCTTYPE"></Column>
                    <Column field="image" header="IMAGE"></Column>
                </DataTable>
            </Panel>

        );
    }

}
