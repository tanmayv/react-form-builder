This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Get started
```
npm install
npm start
```

## Features
- Drag and drop to create forms.
- Register new blocks tools.
- Preview form
- Export form to json
- Import form from json

## API
### Form Builder
| Prop | Type  | Detail  |
|---|---|---|
| data | {blocks: BlockData[]} | List of blocks in the form. |
| registry | [key: string]: FormBuilderBlockConfig  | Register block handler to new block types. |
| change | (cb: (currentBlocks: BlockData[]) => BlockData[]) => void;  | CB to change block list. |

### BlockData
| Prop | Type  | Detail  |
|---|---|---|
| id | any | Unique id for the block in the block list |
| type | string | Type of block handler for the block |
| data | properties  | Map of properties required by the handler. |

### FormBuilderBlockConfig
| Prop | Type  | Detail  |
|---|---|---|
| iconClass | string | iconClass accepted by material-ui's icon that will be rendered in block tool |
| type | string | Type of the block which will handled by the handler |
| handler | React.Component\<ConfigProps\> | Component that will rendered for the block. Block data is passed as props to this component.  |

### ConfigProps
| Prop | Type  | Detail  |
|---|---|---|
| properties | any | customer properties required by the handler. |
| change | (property: any) => void; | CB to change a property in properties |
| changeOne | (propertyName: string, propertyValue: any) => void;  | CB to change a property in properties by key |
| createProperty | (type: PropertyType, name: string, defaultValue: any) => void; | Create a new property which can be of type `string | number | string-array | string-options | boolean` |

> Based on properties, each block has a generated form that can be used to update those property from UI as well. ConfigProps are used to register any property type that is required by custom block handler.

## Create custom block handler

### Step 1: Create a new React component that received ConfigProps.
```
const ImageComponent: React.FC<ConfigProps> = ({}) ={
  // ...
}
``` 

### Step 2: Create properties required by the componenet.
These properties will be stored in json object, and will passed when block needs to be rendered. `Name` and `Label` are default properties.
In this component, we need url property to render the image. Properties need to be registered in inside useEffect() so that they are only created once.
```
  const ImageComponent: React.FC<ConfigProps> = ({createProperty}) ={
    useEffect(() => {
      createProperty(PropertyType.STRING, 'url', 'https://picsum.photos/600/400');
    }, []);
  }
```

### Step 3: Render component based on properties.
```
  const ImageComponent: React.FC<ConfigProps> = ({createProperty, properties}) ={
    useEffect(() => {
      createProperty(PropertyType.STRING, 'url', 'https://picsum.photos/600/400');
    }, []);
    return <img src={properties.url}/>
  }
```

### Step 4: Register block handle to the registry
```
const builderProps: FormBuilderProps = {
    registry: { 
      image: {
        handler: ImageComponent,
        title: 'Image',
        iconClass: 'image'
      },
      // ...

  <FormBuilder {...builderProps}/>
```