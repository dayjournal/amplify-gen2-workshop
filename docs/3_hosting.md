# hosting

todo アプリを hosting します。

## 下準備

### ディレクトリの整理

`todo-app`以下の内容をルート以下に移動させます。
Amplify

```shell
mv todo-app/* .
mv ./todo-app/.gitignore .
mv ./todo-app/.amplify/ .
rm -rf todo-app/
```

Amplify Hosting 用の設定を自動検出させるために必要な作業です。

修正をコミットしておきましょう。

### ビルドコマンドの確認

ビルドコマンドでエラーが発生しないか、確認しておきましょう。

```shell
kiro-cli
>
npm run buildでビルドエラーを解消してください。
```

修正があれば、忘れずにコミットしておきましょう。

## デプロイ設定

Amplify Hosting のマネコン上でデプロイ設定していきます。

1. [マネコンページ](https://us-east-1.console.aws.amazon.com/amplify/apps)にアクセス
2. `アプリケーションをデプロイ` をクリック
3. Git プロバイダーとして GitHub を選択し、次をクリック
4. 別ウインドウが立ち上がるので、`Authorize AWS Amplify (us-east-1)` をクリック
5. GitHub の個人組織を選択し、`Only select repositories` で作成したレポジトリを選択し Install をクリック
6. リポジトリとブランチを追加にて作成したレポジトリを選択し、次をクリック
7. アプリケーションの設定が自動検出されているはずなので、そのまま次をクリック
8. デプロイをクリック

`デプロイ済み`と表示されれば、OK です。
ドメインと表示されている下の URL にアクセスして、実装した Todo アプリが表示されれば完成です。

> [!NOTE]
>
> sandbox 環境とは別のアプリケーションです。
> ユーザーや作成したデータは引き継がれませんので、ご注意ください。
