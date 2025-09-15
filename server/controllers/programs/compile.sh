for dir in */; do
    cd $dir
    g++ -g *.cpp -o ${dir%?}
    cd ..
done