import React, { Component } from 'react';




export class SvgItem extends Component {


    render(){
        return (
            <div className="specification-item col-12">
                <div className="row no-padding">
                    <div className="col-xl-2 col-lg-3 col-md-12 col-sm-12"><span className="properties">{this.props.type}</span></div>
                    <div className="col-xl-9 col-lg-8 col-md-12 col-sm-12">
                        {this.props.showFields ?
                            <p className="row no-padding">
                                <label className="value mm col-12">
                                    <input className="number" type="number" name={this.props.type}
                                           onChange={e => this.props.changeInput(e)}
                                           onBlur={e => this.props.validateInput(e)}
                                           // defaultValue={this.props.dim ? this.props.dim : ''}
                                           value={this.props.dim ? this.props.dim : ''}
                                           max={this.props.kit.kitItem['max_'+this.props.type]}
                                           min={this.props.kit.kitItem['min_'+this.props.type]}
                                    />
                                </label>
                            </p>
                            :
                            <p className="row no-padding">
                                <label className="value in col-xl-4 col-lg-4 col-md-4 col-sm-4">
                                    <input className="number" type="number" name={this.props.type}
                                           onChange={e => this.props.changeInput(e,1)}
                                           onBlur={e => this.props.validateInput(e,1)}
                                           // defaultValue={this.props.in[this.props.type][0]}
                                           value={this.props.in[this.props.type][0]}
                                           max={this.props.kit.kitItem['max_'+this.props.type]}
                                           min={this.props.kit.kitItem['min_'+this.props.type]}
                                    />
                                </label>
                                <label className="value in col-xl-4 col-lg-4 col-md-4 col-sm-4">
                                    <input className="number" type="number" name={this.props.type}
                                           onChange={e => this.props.changeInput(e,2)}
                                           onBlur={e => this.props.validateInput(e,2)}
                                           // defaultValue={this.props.in[this.props.type][1]}
                                           value={this.props.in[this.props.type][1]}
                                           max={this.props.kit.kitItem['max_'+this.props.type]}
                                           min={this.props.kit.kitItem['min_'+this.props.type]}
                                    />
                                </label>
                                <label className="value in fraction-icon col-xl-4 col-lg-4 col-md-4 col-sm-4">
                                    <input className="number" type="number" name={this.props.type}
                                           onChange={e => this.props.changeInput(e,3)}
                                           onBlur={e => this.props.validateInput(e,3)}
                                           // defaultValue={this.props.in[this.props.type][2]}
                                           value={this.props.in[this.props.type][2]}
                                           max={this.props.kit.kitItem['max_'+this.props.type]}
                                           min={this.props.kit.kitItem['min_'+this.props.type]}
                                    />
                                </label>
                            </p>
                        }
                    </div>
                    <div className="change-dimension">
                        <button onClick={e => this.props.changeDimension(e, )} className="update"><b className="unit" data-unit="in">{this.props.dimension[this.props.type]}</b><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 15" xmlSpace="preserve"><g><g transform="translate(-1443 -501)"><g><path d="M1458,508.5h1v1.5c0,2-1.3,2.6-2,2.6h-12.3l2.6,2.7l-0.7,0.7l-3.5-3.6c-0.2-0.2-0.2-0.5,0-0.7l3.5-3.6l0.7,0.7l-2.6,2.7h12.3c0.2,0,1-0.1,1-1.5V508.5z M1444,508.5h-1V507c0-2,1.3-2.5,2-2.5h12.3l-2.7-2.7l0.7-0.7l3.5,3.6c0.2,0.2,0.2,0.5,0,0.7l-3.5,3.6l-0.7-0.7l2.6-2.7H1445c-0.2,0-1,0.1-1,1.5L1444,508.5z"/></g></g></g></svg></button>
                    </div>
                </div>
            </div>

        );
    };
}

