import {TypeData} from "@alchemist-editor/dotnet";

export const unityCommonTypes = {
    vector2: new TypeData("Vector2", "UnityEngine"),
    vector3: new TypeData("Vector3", "UnityEngine"),
    vector4: new TypeData("Vector4", "UnityEngine"),
    quaternion: new TypeData("Quaternion", "UnityEngine")
};

export const unityGameTypes = {
    gameObject: new TypeData("GameObject", "UnityEngine"),
    monoBehaviour: new TypeData("MonoBehaviour", "UnityEngine"),
    rigidBody: new TypeData("RigidBody", "UnityEngine"),
    rigidBody2D: new TypeData("RigidBody2D", "UnityEngine")
};

export const unityCommonTypeList = Object.values(unityCommonTypes);
export const unityGameTypeList = Object.values(unityGameTypes);