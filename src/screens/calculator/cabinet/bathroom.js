import React, { Component } from 'react';


class Bathroom extends Component {


    componentDidMount(){

        this.props.svgFunctions( 'bathroom');
    }


    render() {
        let room = this.props.room;
        return (
            (room.length>0 || room.id) ?
                <div  id={room.name+"-room"} className="room tab-pane fade show active" role="tabpanel" aria-labelledby={room.name+"-tab"}>
                    <div className={room.name+" row align-items-center"}>
                        <div className="col-xl-9 col-lg-9 col-md-8 col-sm-12">
                            <div className={room.name+"-project"}>
                                <div className={room.name+"-svg svg-wrapper"}>
                                    <svg id={room.name} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"  x="0px" y="0px" viewBox="0 0 1029 632" style={{enableBackground:'new 0 0 1029 632'}} xmlSpace="preserve">
                                        <image id={room.name+"_b_bg"} style={{overflow:'visible'}} width="1029" height="632" xlinkHref={room.big_image}  transform="matrix(1 0 0 1 0 0)"></image>
                                        <defs>
                                            <pattern patternUnits="userSpaceOnUse" id={room.name+"Ramapattern"} x="0" y="0" width="1029" height="632">
                                                <image width="1029" height="632" xlinkHref={room.big_image}  transform="matrix(1 0 0 1 0 0)"></image>
                                            </pattern>
                                        </defs>


                                        {(room.kitCategories !== undefined &&room.kitCategories.length>0) ?

                                            this.props.svgItems(room,this.props)

                                        :''}

                                        <rect className="tooltip_bg" id={room.name+"Tooltip_bg"} x="0" y="-25" rx="0" ry="0" width="145" height="35" visibility="hidden"></rect>
                                        <text className="tooltip" id={room.name+"Tooltip"} x="0" y="0" visibility="hidden">Tooltip</text>
                                    </svg>
                                </div>
                                <ul id={room.name+"CabinetList"} className="cabinet-list"></ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12">
                            <div className="cabinet-elements">
                                <h2 className="text-align-right">Cabinet Type</h2>
                                <ul id={room.name+"CabinetTypes"} className="elements-list">
                                    {(room.kitCategories !== undefined &&room.kitCategories.length>0) ?
                                        this.props.sidebarItems(room,this.props)
                                        :
                                        ''
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                : ''
        )
    }
}


export default Bathroom;
