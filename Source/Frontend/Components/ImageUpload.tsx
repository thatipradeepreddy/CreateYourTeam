// import React, { useState } from 'react';
// import { View, Button, Image } from 'react-native';
// import ImagePicker from 'react-native-image-picker';

// interface ImageUploadProps {
//     onImageSelect: (imageUri: string) => void;
// }

// const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
//     const [selectedImage, setSelectedImage] = useState<string | null>(null);

//     const selectImage = () => {
//         ImagePicker.showImagePicker({ title: 'Select Image' }, response => {
//             if (!response.didCancel && !response.error) {
//                 const source = { uri: response.uri };
//                 setSelectedImage(response.uri);
//                 onImageSelect(response.uri);
//             }
//         });
//     };

//     return (
//         <View>
//             <Button title="Select Image" onPress={selectImage} />
//             {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />}
//         </View>
//     );
// };

// export default ImageUpload;
