import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Image, Text,
    ScrollView,
    View,
    SafeAreaView
} from 'react-native';
import {store} from '../../store/store';
import {setCalcOptions, setKitItem, showPriceButton} from '../../actions/kit';
import {get, postForm} from '../../api/main';

import { connect } from 'react-redux';
import {setPrice} from '../../actions/kit';
import {addProductToCart} from '../../actions/cart';
import DimensionsInput from './blocks/DimensionsInput';
import SelectOptions from './blocks/SelectOptions';
import ProductKitSelect from './blocks/ProductKitSelect';

// Screen: Counter
class Specifications extends React.Component {




    constructor(props){


        super(props);


        this.state = this.getInitialState(this.props.kit.calcOptions);

        this.onOpenModal= this.onOpenModal.bind(this);
        this.onCloseModal= this.onCloseModal.bind(this);
        this.validateInput= this.validateInput.bind(this);
    }


    getInitialState = (calcOptions) => {
        let kitOptions = this.props.kit.kitItem.options ;
        kitOptions= (kitOptions && kitOptions!== undefined) ? kitOptions : false;
        kitOptions = (kitOptions.id) ? [kitOptions] : kitOptions;
        if(calcOptions && calcOptions.height){
            calcOptions.height = false;
            calcOptions.width = false;
            calcOptions.depth = false;

        }
        let calcOptionsState = calcOptions ?calcOptions :  {
            height:false,
            width:false,
            depth:false,
            materials:{} ,
            quantity:1,
            comment:null,
            CB:true,
        };

        if(kitOptions && kitOptions.length>0){
            for(let i in kitOptions){
                let values =kitOptions[i].value;

                values = values ? values.split(','):false;
                if(values && values.length<2){

                    calcOptionsState[kitOptions[i].description] = values[0];
                }
            }
        }

        this.getProductTypes();


        return {
            showFields: true,
            modalOpen: false,
            modalProducts: [],
            calcOptions :calcOptionsState,
            errors:{},
            in: {
                height: ["1","1","1"],
                width:["1","1","1"],
                depth:["1","1","1"],
            },
            productTypes:false,

            dimension:{
                height:'mm',
                width:'mm',
                depth:'mm',
            },
        };


    };



    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if( JSON.stringify(this.state) !== JSON.stringify(prevState) ){
            this.checkInputs(this.state);
        }
    }

    componentDidMount(){
    }



    componentWillUnmount(){

        let initialState = this.getInitialState();
        initialState.calcOptions.materials = this.state.calcOptions.materials;

        let calcOptions = initialState.calcOptions;
        this.setState({calcOptions:calcOptions});
        store.dispatch(showPriceButton(false));
        store.dispatch(setPrice({price: false}));
    }


    checkInputs(nextState){
        let typesSlugs = this.addTypesSlug();
        let show = true;
        let self = this;
        let allOptsArr = Object.keys(nextState.calcOptions);
        for(let i in allOptsArr) {
            if (nextState.calcOptions[allOptsArr[i]] === false && allOptsArr[i] !== 'comment' &&
                (self.props.kit.kitItem['show_'+allOptsArr[i]] && self.props.kit.kitItem['show_'+allOptsArr[i]]===1)
            ) {
                show = false;
            }
        }


        if(typesSlugs.length<1){
            // show = false;
        }

        for(let j in typesSlugs){
            if(!nextState.calcOptions.materials[typesSlugs[j]]){
                show = false;
            }
        }
        store.dispatch(showPriceButton(show));
    }
    addTypesSlug (){
        let productTypesSlugs = [];

        let types = this.state.productTypes;
        for (let i in types){
            productTypesSlugs.push(types[i].slug);
        }

        return productTypesSlugs;
    }

    changeDimension(e){
        e.preventDefault();
        let dim = 'mm';
        let dimension = {...this.state.dimension};
        for(let i in Object.keys(dimension)) {
            if(dimension[Object.keys(dimension)[i]] === 'mm'){
                dim = 'in';
            }
            dimension[Object.keys(dimension)[i]] = dim;

        }

        this.setState({dimension});
        this.setState({showFields: !this.state.showFields});
    }


    changeInput(name,value,inch=false, min,max, type=false){
        let calcOptionsState ={...this.state.calcOptions};
        if(type !== 'number'){
            calcOptionsState[name] = value;
            this.setState({ calcOptions: calcOptionsState});
            store.dispatch(setCalcOptions(calcOptionsState));
            return;
        }
        store.dispatch(setPrice({price: false}));



        if(inch){
            let inState = this.state.in;

            inState[name][inch-1] = value;
            this.setState({ in: inState });

            let mmVal = this.convertFromInchState(inState[name]);
            if(!isNaN(mmVal)){

                value = parseInt(mmVal);

            }
        }
        // if (input.classList)
        //     input.classList.remove('isInvalid');
        // else
        //     input.className = input.className.replace(new RegExp('(^|\\b)' + 'isInvalid'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');

        calcOptionsState[name] = value;
        this.setState({ calcOptions: calcOptionsState});
        store.dispatch(setCalcOptions(calcOptionsState));
    }
    validateInput(name,value,inch=false, min,max, type){

        let calcOptionsState ={...this.state.calcOptions};
        if(type !== 'number'){
            calcOptionsState[name] = value;
            this.setState({ calcOptions: calcOptionsState});
            store.dispatch(setCalcOptions(calcOptionsState));
            return;
        }
        store.dispatch(setPrice({price: false}));


        if(inch){
            let inState = this.state.in;
            inState[name][inch-1] = value;
            this.setState({ in: inState });
            let mmVal = this.convertFromInchState(inState[name]);
            if(!isNaN(mmVal)){
                value = parseInt(mmVal);
            }
        }

        if(value > max || value < min){


            calcOptionsState[name] = false;

            let errors = {};
            errors[name] = 'Dimension must be between '+ min+' and '+max+ ' mm';

            this.setState({ calcOptions: calcOptionsState, errors:errors});

            store.dispatch(setCalcOptions(calcOptionsState));
        }else{

            calcOptionsState[name] = value;
            this.setState({ calcOptions: calcOptionsState, errors:{}});
            store.dispatch(setCalcOptions(calcOptionsState));
        }
    }


    convertFromInchState(inchstate){
        let coefficient = 25.4;
        let newDistance;
        newDistance = (parseInt(inchstate[0]) + (parseInt(inchstate[1])/parseInt(inchstate[2])))*coefficient;

        return newDistance.toFixed();
    }

    onOpenModal = (type,e) => {
        e.preventDefault();
        store.dispatch(setPrice({price: false}));
        this.getProducts(type);
        this.setState({ modalOpen: true });
    };

    onCloseModal = () => {
        console.warn('modalClose');
        this.setState({ modalOpen: false });
    };

    getProducts(type){

        return  get('/kit/api/product-attribute-values?fields=name,slug&expand=products&filter[slug]='+type )
            .then(res => {
                let modalProducts = res;
                this.setState({ modalProducts });
            })
            .catch(err => {
                console.log(err);
                let modalProducts = [];
                this.setState({ modalProducts });
                if (err.response) {
                    if(err.response.status === 401){
                        // window.location.href = '/login'
                    }
                }
            });
    }


    getProductByName(name){
        return  get('calc', '/kit/api/product?filter[name]='+name )
    }

    getProductTypes(){
        let filtertype = '';
        // if(this.props.kit.itemType==="fillers-gables-headers-toekick"){
        //     filtertype += '&filter[values.slug]=interior_material';
        // }
        get('calc','/kit/api/product-attribute?filter[attributes.slug]=type'+filtertype )
            .then(res => {
                let productTypes = res;

                productTypes = productTypes.filter(type=>{
                    let show = !((this.props.kit.kitItem.show_attributes && this.props.kit.kitItem.show_attributes['show_'+type.slug] && this.props.kit.kitItem.show_attributes['show_'+type.slug]==0) );

                    return show ? type : false;
                });

                this.setState({ productTypes });
            })
            .catch(err => {
                console.log(err);
                let productTypes = [];
                this.setState({ productTypes });
            });
    }

    chooseMaterial(e, type,product){
        e.preventDefault();
        let self = this;
        let withDoorsTypes = ['exterior_material', 'door_material'];
        let FrontLogicTypes = ['door_style', 'drawer_style'];
        let noFrontsTypes = ['door_material','door_style', 'drawer_style'];


        if(this.props.kit.kitItem.change_main_image && this.props.kit.kitItem.change_main_image===1){
            let kitItem = this.props.kit.kitItem;
            kitItem.big_image = product.image;
            setKitItem(kitItem);
        }

        let calcOptionsState = {...this.state.calcOptions};
        calcOptionsState.materials[type] = product;
        this.props.kit.kitItem.options.forEach(function (item) {
            if(item.abbreviation === 'with_doors' && withDoorsTypes.indexOf(type)!==-1){
                withDoorsTypes.splice(withDoorsTypes.indexOf(type), 1);
                calcOptionsState.materials[withDoorsTypes[0]] = product;
            }
        });




        if(product.fronts_with_logic && product.fronts_with_logic===1 && type ==='door_material'){
            self.getProductByName('Slab').then(product=>{
                    if(product.data && product.data[0] && product.data[0].name)
                        FrontLogicTypes.forEach(function (item) {

                            calcOptionsState.materials[item] = product.data[0];

                            self.setState({ calcOptions: calcOptionsState });
                        });

                }
            ).catch(err => {
                console.log(err);
            });



            let types = this.state.productTypes;
            for (let i in types){
                if(FrontLogicTypes.indexOf(types[i].slug)!==-1){
                    types[i].disabled = true
                }
            }

            this.setState({ types: types});
        }


        if(product.name.toLowerCase().replace(' ','') === 'nofronts'  && noFrontsTypes.indexOf(type)!==-1){
            noFrontsTypes.forEach(function (item) {
                calcOptionsState.materials[item] = product;
            });
            self.getProductByName('NO DRILlING REQUIRED').then(product=>{

                    if(product.data && product.data[0] && product.data[0].name){
                        calcOptionsState.materials['pull_drilling'] = product.data[0];
                        self.setState({ calcOptions: calcOptionsState });
                    }
                }
            ).catch(err => {
                console.log(err);
            });


        }
        this.setState({ calcOptions: calcOptionsState, modalOpen: false });
        store.dispatch(setCalcOptions(calcOptionsState));
    }
    getPrice(e){
        // e.preventDefault();
        let postData = {
            state :this.state.calcOptions,
            kit :this.props.kit.kitItem,
        };

        postForm('calc','/kit/api/calc/get-price',
            postData
        )
            .then(res => {
                store.dispatch(setPrice({price: res.data}));
            })
            .catch(err => {
                console.log(err);

            });


    }
    addToCart(){

        let fields = this.state.calcOptions;

        let product = {
            id:new Date().getTime(),
            name:this.props.kit.kitItem.name,
            price:this.props.kit.price,
            system_files:[{disk_name:this.props.kit.kitItem.small_image}],
            kit : this.props.kit.kitItem,
            fields : fields,
        };

        store.dispatch(addProductToCart(product, fields.quantity));
        store.dispatch(setPrice({price: false}));
        if(!this.props.kit.kitItem.show_in_specs || this.props.kit.kitItem.show_in_specs!==1){
            // this.props.history.push(this.props.parentRoute+'/options');
        }else{
            let calcOptionsState ={...this.state.calcOptions};

            calcOptionsState['height'] = false;
            calcOptionsState['width'] = false;
            calcOptionsState['depth'] = false;
            calcOptionsState['comment'] = null;
            this.setState({ calcOptions: calcOptionsState});
            store.dispatch(setCalcOptions(calcOptionsState));
        }

    }

    clearAllInputs(){
        let initialState = this.getInitialState();
        this.setState({calcOptions:initialState.calcOptions} );
    }




    render() {
        let dimensions = ['height', 'width', 'depth'];
        let kitOptions = this.props.kit.kitItem.options ;
        kitOptions= (kitOptions && kitOptions!== undefined) ? kitOptions : [];
        kitOptions = (kitOptions.id) ? [kitOptions] : kitOptions;

        return (
                <View  style={{flex:1, }}>
                    <View style={{flex:1, }}>
                        <Image
                            style={{
                                flex: 1,
                                alignSelf: 'stretch',
                                // width: undefined
                            }}

                            resizeMode={'cover'}
                            source={{
                                uri: (
                                    typeof this.props.kit.calcOptions.CB !=="undefined"
                                    && this.props.kit.calcOptions.CB!=1
                                    && this.props.kit.kitItem.cabinet_base_image)
                                    ? this.props.kit.kitItem.cabinet_base_image
                                    : this.props.kit.kitItem.big_image
                            }}/>
                    </View>
                <ScrollView  style={styles.scrollView} >
                        <View style={{flex:1, alignItems:'center'}}>
                            {kitOptions.map((option,index)=>{
                                if( option.abbreviation.trim() === 'CB'){
                                    return <View key={index}>
                                                <Text>{option.description}</Text>
                                                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                                    <TouchableOpacity  onPress={e=>this.validateInput( 'CB',1)} style={[styles.radioButton,((this.state.calcOptions['CB']==1) ? styles.active : false)]}><Text>Yes</Text></TouchableOpacity>
                                                    <TouchableOpacity onPress={e=>this.validateInput('CB',0)} style={[styles.radioButton,((this.state.calcOptions['CB']!=1) ? styles.active : false)]}><Text>No</Text></TouchableOpacity>
                                                </View>
                                            </View>
                                }
                            })
                            }
                            {dimensions.map((type, index)=>{

                                let show = !((this.props.kit.kitItem.show_attributes && this.props.kit.kitItem.show_attributes['show_'+type] && this.props.kit.kitItem.show_attributes['show_'+type]==0) );

                                return show ?

                                    <DimensionsInput
                                        key={index}
                                        changeDimension = {this.changeDimension.bind(this)}
                                        validateInput = {this.validateInput.bind(this)}
                                        changeInput = {this.changeInput.bind(this)}
                                        dimension = {this.state.dimension}
                                        kit = {this.props.kit}
                                        type={type}
                                        showFields ={this.state.showFields}
                                        dim = {this.state.calcOptions[type]}
                                        in={this.state.in}
                                        errors = {this.state.errors}
                                    />
                                    : '';
                            })}
                            {
                                kitOptions.map((option,index)=>{
                                    let values =option.value;
                                    values =values ?  values.split(',') :false;
                                    if(option.abbreviation.trim() !== 'CC' && option.abbreviation.trim() !== 'with_doors' && option.abbreviation.trim() !== 'CB'){
                                        return (<SelectOptions
                                                    key={index}
                                                    name={option.abbreviation}
                                                    onChange={this.validateInput}
                                                    description = {option.description}
                                                    values = {values}
                                                    value={this.state.calcOptions[option.abbreviation] ?? 'Choose '+option.description}
                                                />)
                                    }

                                })
                            }


                            {(this.state.productTypes&&this.state.productTypes.length>0)&&
                            this.state.productTypes.map((type,typeIndex)=>{
                                let show = !((this.props.kit.kitItem.show_attributes && this.props.kit.kitItem.show_attributes['show_'+type.slug] && this.props.kit.kitItem.show_attributes['show_'+type.slug]==0) );
                                return( show &&
                                    <ProductKitSelect
                                        key={typeIndex}
                                        type={type}
                                        calcOptions={this.state.calcOptions}
                                        onOpenModal = {this.onOpenModal}
                                        onCloseModal = {this.onCloseModal}
                                        modalOpen={this.state.modalOpen}
                                        modalProducts={this.state.modalProducts}
                                    />
                                );
                            })
                            }
                        </View>
                </ScrollView>
                </View>

        )
    }



}

const styles = StyleSheet.create({
    scrollView: {
        flex:1,
        // alignItems:'center'
        backgroundColor:'#f5f5f5'
    },
    radioButton:{
        backgroundColor:'#c8ced3',
        color:'#23282c',
        padding:10
    },
    active:{
        backgroundColor:'#acb5bc',
    },

});




// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {

    // Redux Store --> Component
    return {
        kit:state.kitReducer,

    };
};

export default connect(mapStateToProps)(Specifications);

