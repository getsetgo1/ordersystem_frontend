// 저장소임. 
// 어딘가의 공간에서 변수를 관리한다.
function initState() {
    return {

        productsInCart:JSON.parse(localStorage.getItem('productsInCart')) || [],
        totalQuantity: localStorage.getItem('totalQuantity')||0,
    }
}


const practice = {
    // state: 상태를 의미하는 객체로서 initState를 통해 상태 초기화
    state: initState,
    // mutations는 상태를 변경하기 위한 함수들의 집합이다.
    // mutation은 컴포넌트에서 직접 호출되기 보다는, actions를 통해 mutation이 호출된다.
    // 그 이유는 여러 mutation을 연속적으로 호출하는 등의 경우가 있을 수 있기 때문이다.
    mutations: {
        addCart(state,product){
            const existProduct= state.productsInCart.find(p=>p.id==product.id);
            if(existProduct){
                existProduct.quantity+=product.quantity;
            }
            else{
                state.productsInCart.push(product);

            }
            state.totalQuantity=parseInt(state.totalQuantity)+product.quantity;
            // 로컬스토리지에 데이터 직렬화하여 삽입
            localStorage.setItem('productsInCart',JSON.stringify(state.productsInCart)); // 기존에 뭐가 있든 갈아끼우는 것
            localStorage.setItem('totalQuantity',state.totalQuantity);
        },

        clearCart(state){
            state.productsInCart=[];
            state.totalQuantity=0;
            localStorage.removeItem('totalQuantity');
            localStorage.removeItem('productsInCart');
        }

    },
    actions: {
        addCart(context,product){
            context.commit("addCart",product);
        },
        clearCart(context){
            context.commit('clearCart')
        }

    },
    getters: {
        getTotalQuantity:state=>state.totalQuantity,
        getProductInCarts:state=>state.productsInCart,
        // getCount: state => state.count
    },

}

export default practice;