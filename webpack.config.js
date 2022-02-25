//webpack roda dentro do node e o node entende o formato de importação utilizando o require
const path = require('path') 
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpack = require('@pmmmwh/react-refresh-webpack-plugin')

//verificar se a variavel NODE_ENV é diferente de production se não será development
const isDevelopment = process.env.NODE_ENV !== 'production' 
module.exports ={
    mode: isDevelopment ? 'development' : 'production',

    //source-map para ajudar na leitura do erro. Pode ser diferenciado por ambiente de dev e produção
    devtool: isDevelopment ? 'eval-source-map' : 'source-map', 

    //entry: qual o arquivo principal da nossa aplicação. o __dirname vai pegar o diretorio de onde ta o nosso arquivo webpack. 
    //Dessa forma ele vai colocar a barra correta de acordo com o sistema operacional.
    entry: path.resolve(__dirname, 'src', 'index.tsx'), 
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        //Informar que vai aceitar ambas as extensões
        extensions: ['.js', '.jsx', '.ts', '.tsx'] 
    },
    devServer: {
        //Informar onde está o conteudo estatico da aplicação
        static: path.resolve(__dirname, 'public'),
        hot: true //pro react refresh
    },
    plugins: [
        //Quando não se tem o 'else' do ternario se pode colocar os dois && comerciais
        isDevelopment && new ReactRefreshWebpack(),
        new HtmlWebpackPlugin({
            //qual arquivo de template que ele vai usar para gerar o html
            template: path.resolve(__dirname, 'public', 'index.html')
        })
    ].filter(Boolean), //Hack pra poder add plugin de forma condicional dentro do webpack"
    module: {
        //Como aplicação vai se comportar quando estiver importando cada um dos tipos de arquivos
        rules: [
            { 
                //recebe uma expressão regular
                //primeiro pegar como o arquivo termina utilizando o $. Colocar uma barra na frente para identificar 
                //o . da extensão
                test:/\.(j|t)sx$/,
                exclude: /node_modules/,
                //integração entre webpack e babel
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            isDevelopment && require.resolve('react-refresh/babel')
                        ].filter(Boolean)
                    }
                }
            },
            {
                //recebe uma expressão regular
                //primeiro pegar como o arquivo termina utilizando o $. Colocar uma barra na frente para identificar 
                //o . da extensão
                test:/\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader'] //integração entre webpack e babel
            }
        ],
    }
}