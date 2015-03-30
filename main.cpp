#include <iostream>
#include <cmath>
using namespace std;

long calcRecursiv(int n){
	if(n <= 2){
		return 1;
	} else {
		return calcRecursiv(n-1) + calcRecursiv(n-2);
	}
}

long long calcIterative(int n){
	long long first = 1;
 	long long second = 1;
	long long final = 1;

	for (int i = 3; i <= n; i++) {
		final = first + second;
		second = first;
		first = final;
	}
	return final;
}

long long calcMoivet(int n){
	float firstFraction = 1 / sqrt(5);
	double secondFraction = pow((1 + sqrt(5)) / 2, n);
	double thirdFraction = pow((1 - sqrt(5)) / 2, n);
	return round(firstFraction * (secondFraction - thirdFraction));
}

int main(){
	int n=50;
	cout<<calcRecursiv(n)<<endl;
	//cout<<calcIterative(n)<<endl;
	//cout<<calcMoivet(n)<<endl;
	return 0;
}